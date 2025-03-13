import os
import sys
import pandas
from datetime import datetime

months_to_dec = {
    "Jan": 1, "Feb": 2, "Mar": 3, "Apr": 4, "May": 5, "Jun": 6,
    "Jul": 7, "Aug": 8, "Sep": 9, "Oct": 10, "Nov": 11, "Dec": 12
}

def make_hash(dataset, key_col, val_col):
    data = pandas.read_csv(dataset)
    hash_map = dict(zip(data[key_col], data[val_col]))
    return hash_map

def fix_height(string):
    string_arr = string.split("-")
    if string_arr[1] in months_to_dec:  # INCHES'MONTH format
        return f"{months_to_dec[string_arr[1]]}'{int(string_arr[0])}"
    else:   # FEET-INCHES format
        return f"{string_arr[0]}'{int(string_arr[1])}"


def make_players(dataset, teams_file):
    team_name_map = make_hash(teams_file, "team", "tid")
    """
    In the original dataset there is an error with Arvydas Sabonis' draft team
    which is "Atlanta Hawks (1985);Round 1" which is why the next line exists
    """
    team_name_map["Atlanta Hawks (1985);Round 1"] = team_name_map["Atlanta Hawks"]
    cols_to_keep = ["Player", "birth_year", "birth_month", "birth_date", "nationality",
                    "high_school", "draft_round", "draft_pick", "draft_team"]
    filt_col, filt_val = "League", "NBA"
    out_file = os.path.join("./prod/", "players.csv")

    data = pandas.read_csv(dataset, header=0)   # read data
    sel_data = data[cols_to_keep]  # select good cols
    filt_data = sel_data[data[filt_col] == filt_val] # filter out nba players only
    unique_data = filt_data.drop_duplicates("Player").copy() # get unique player rows
    unique_data["birth_date"] = unique_data["birth_date"].apply(    # conform to sql date type
        lambda x: datetime.strptime(x, "%b %d, %Y").strftime("%Y-%m-%d"))
    unique_data["draft_team"] = unique_data["draft_team"].map(team_name_map) # update the draft_tid
    # rename cols & output with unique pids
    unique_data.rename(columns={"Player": "pname", "draft_team": "draft_tid"}, inplace=True)
    unique_data.to_csv(out_file, index=True, index_label="pid", na_rep="NULL", quoting=1)

def make_members(dataset, teams_file):
    players_file = os.path.join("./prod/", "players.csv")
    player_map = make_hash(players_file, "pname", "pid")
    team_abbrv_map = make_hash(teams_file, "abbreviation", "tid")
    cols_to_keep = ["Player", "Team", "Season", "Stage", "GP", "MIN", "FGM", "FGA",
                    "3PM", "3PA", "FTM", "FTA", "TOV", "PF", "ORB", "DRB", "REB",
                    "AST", "STL", "BLK", "PTS", "height", "height_cm", "weight",
                    "weight_kg"]
    filt_col, filt_val = "League", "NBA"
    out_file = os.path.join("./prod/", "members.csv")

    data = pandas.read_csv(dataset, header=0, dtype={"height": str}) # read data
    sel_data = data[cols_to_keep]   #  select good cols
    filt_data = sel_data[data[filt_col] == filt_val].copy() # filter out nba players only
    # prepare for output
    filt_data["Player"] = filt_data["Player"].map(player_map)
    filt_data["Team"] = filt_data["Team"].map(team_abbrv_map)
    filt_data["height"] = filt_data["height"].map(lambda x: fix_height(x))
    filt_data.rename(columns={"Player": "pid", "Team": "tid", "3PM": "threepm",
                              "3PA": "threepa"}, inplace=True)
    filt_data.columns = filt_data.columns.str.lower()
    # output
    filt_data.to_csv(out_file, index=False)

if __name__ == "__main__":
    assert(len(sys.argv) == 2)
    dataset = sys.argv[1]
    assert(os.path.isfile(dataset))
    teams_file = "./prod/teams.csv"
    # make csv files
    make_players(dataset, teams_file)
    make_members(dataset, teams_file) # always call players before members

