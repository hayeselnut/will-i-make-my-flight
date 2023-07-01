from datetime import datetime

AIRLABS_TS_FMT = "%Y-%m-%d %H:%M"
DEFAULT_TS_FMT = "%Y-%m-%dT%H:%M:%SZ"
    
def month_from_timestamp(timestamp, ts_format):
    time_obj = datetime.strptime(timestamp, ts_format)
    return int(time_obj.strftime("%m"))