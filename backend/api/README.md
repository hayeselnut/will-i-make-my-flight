# API Docs

## Requirements

- Python 3.9
- venv

## Set up

Create virtual environment

```
python3 -m venv .venv
```

Activate environment

```
. .venv/bin/activate
```

Install dependencies

```
pip install -r requirements.txt
```

## Running locally

Activate environment if you haven't already

```
. .venv/bin/activate
```

Run start script

```
./start-dev.sh
```

## Adding dependencies

Install a new package

```
pip install <package>
```

Update requirements

```
pip freeze > requirements.txt
```
