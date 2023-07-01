import requests
from bs4 import BeautifulSoup
import csv
from time import sleep
import time

def convert(str):
    if len(str) == 1:
        return "0" + str + "00"
    else:
        return str + "00"

def scrape_airport():
    airport = (soup.find('p', attrs={'class': 'lead center'})).get_text()[:3]
    time = soup.findAll('div', class_ = 'col-md-4 col-sm-6 col-12')
    minute = soup.findAll('div', class_ = ['progress-bar bg-success', "progress-bar bg-warning","progress-bar bg-info",'progress-bar bg-danger'])

    time_content = [t.get_text() for t in time]
    minute_content = [m.get_text() for m in minute]

    open_time = time_content[0].split('\n\t\t\t\t')[1].split(' ')[0]
    close_time = time_content[-1].split('\n\t\t\t\t')[1].split(' ')[0]

    final_minutes = []
    for content in minute_content:
        stripped = content.split(' ', 1)[0]
        if stripped is None:
            stripped = 0
        final_minutes.append(stripped)

    if open_time == "12":
        open_time = int(0)

    row = [0] * 24
    i = 0
    for pos in range(int(open_time), len(final_minutes)):
        row[pos] = str(final_minutes[i])
        i += 1

    # AIRPORT START_TIME END_TIME WAIT_TIME

    with open('test.csv', mode='w') as file:
        input = csv.writer(file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
        input.writerow(['airport', 'start_time', 'end_time', 'wait_time'])

        for i, value in enumerate(row):
            minute = str(value)
            start_time = convert(str(i))
            end_time = convert(str(i + 1))
            input.writerow([airport, start_time, end_time, minute])

response = requests.get('https://www.tsawaittimes.com/airports')
c = response.content
soup = BeautifulSoup(c, 'html.parser')

all_links = soup.find_all('a', class_ = 'list-group-item list-group-item-action')

url = 'https://www.tsawaittimes.com'

links_suffix = [link.get("href") for link in all_links]

master_schedule = []

for j, suffix in enumerate(links_suffix):
    sleep(0.5)
    print(f"{j}: fetching {suffix}")
    add_url = url + suffix
    response = requests.get(add_url)
    soup = BeautifulSoup(response.content, 'html.parser')

    airport = (soup.find('p', attrs={'class': 'lead center'})).get_text()[:3]
    time = soup.findAll('div', class_ = 'col-md-4 col-sm-6 col-12')
    minute = soup.findAll('div', class_ = ['progress-bar bg-success', "progress-bar bg-warning","progress-bar bg-info",'progress-bar bg-danger'])

    time_content = [t.get_text() for t in time]
    minute_content = [m.get_text() for m in minute]

    if time_content == []:
        schedule = [1] * 24
    else:
        open_time = time_content[0].split('\n\t\t\t\t')[1].split(' ')[0]
        close_time = time_content[-1].split('\n\t\t\t\t')[1].split(' ')[0]

        final_minutes = []
        for content in minute_content:
            stripped = content.split(' ', 1)[0]
            if stripped is None:
                stripped = 0
            final_minutes.append(stripped)

        if open_time == "12":
            open_time = int(0)

        schedule = [1] * 24
        i = 0
        for pos in range(int(open_time), len(final_minutes)):
            schedule[pos] = str(final_minutes[i])
            i += 1

    for i, value in enumerate(schedule):
        start_time = convert(str(i))
        end_time = convert(str(i + 1))
        minute = str(value)
        master_schedule.append([airport, start_time, end_time, minute])

with open('schedule_compilation.csv', mode='w') as file:
    input = csv.writer(file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
    input.writerow(['airport', 'start_time', 'end_time', 'wait_time'])
    input.writerows(master_schedule)
