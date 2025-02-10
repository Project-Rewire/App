# Development Guide
## Using Docker to run backend (Recommended)
### Prerequisites
- Make sure the latest version of Docker is installed in your system.
  Run `docker --version` and check the output is similar to `Docker version 27.5.1, build 9f9e405`
- Make sure Docker is running in the background.
- Make sure your IDE is opened at the directory of `App/backend/rewire`.
### Build and run the backend
- To build and start the backend system, simply run the following command, and see the matrix falling upon you :)
  ```bash
  docker build --no-cache .
  ```
- This process may take a significant amount of time, depending on your system's performance and internet speed.
- Now run the following command to spin-up the container.
  ```bash
  docker-compose up
  ```
- Since you are running this for the first time it may have to download the required resources, and it may take some time.
- At last, it will start the server at port `8000` of your system, and you should see a output similar to the following.
  ```
  ✔ rewire                     Built                                                                                                                                                                         0.0s
  ✔ Network rewire_default     Created                                                                                                                                                                       0.8s
  ✔ Container rewire-db-1      Created                                                                                                                                                                       0.3s
  ✔ Container rewire-rewire-1  Created                                                                                                                                                                       0.1s
  Attaching to db-1, rewire-1
  db-1      |
  db-1      | PostgreSQL Database directory appears to contain a database; Skipping initialization
  db-1      |
  db-1      | 2025-02-10 17:55:42.381 UTC [1] LOG:  starting PostgreSQL 17.2 (Debian 17.2-1.pgdg120+1) on x86_64-pc-linux-gnu, compiled by gcc (Debian 12.2.0-14) 12.2.0, 64-bit
  db-1      | 2025-02-10 17:55:42.391 UTC [1] LOG:  listening on IPv4 address "0.0.0.0", port 5432
  db-1      | 2025-02-10 17:55:42.401 UTC [1] LOG:  listening on IPv6 address "::", port 5432
  db-1      | 2025-02-10 17:55:42.411 UTC [1] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
  db-1      | 2025-02-10 17:55:42.447 UTC [29] LOG:  database system was shut down at 2025-02-10 17:44:32 UTC
  db-1      | 2025-02-10 17:55:42.531 UTC [1] LOG:  database system is ready to accept connections
  rewire-1  | Watching for file changes with StatReloader
  rewire-1  | Performing system checks...
  rewire-1  |
  rewire-1  | System check identified no issues (0 silenced).
  rewire-1  | February 10, 2025 - 17:55:43
  rewire-1  | Django version 5.1.6, using settings 'admin.settings'
  rewire-1  | Starting development server at http://0.0.0.0:8000/
  rewire-1  | Quit the server with CONTROL-C.
  rewire-1  |
  ```
- But, if your output contains some errors similar to the following output,
  ```
  ...
  rewire-1  |   File "/usr/local/lib/python3.13/site-packages/django/utils/asyncio.py", line 26, in inner
  rewire-1  |     return func(*args, **kwargs)
  rewire-1  |   File "/usr/local/lib/python3.13/site-packages/django/db/backends/postgresql/base.py", line 332, in get_new_connection
  rewire-1  |     connection = self.Database.connect(**conn_params)
  rewire-1  |   File "/usr/local/lib/python3.13/site-packages/psycopg/connection.py", line 119, in connect
  rewire-1  |     raise last_ex.with_traceback(None)
  rewire-1  | django.db.utils.OperationalError: connection failed: connection to server at "172.18.0.2", port 5432 failed: Connection refused
  rewire-1  |     Is the server running on that host and accepting TCP/IP connections?
  ```
  simply stop the container by entering `Ctrl+C` and rerun it again by `docker-compose up`.
- Now everything should work fine. To test if the server is running open `http://localhost:8000` in your browser, and you should see the Django 404 page.

## Running the Backend without Docker
### Prerequisites
- Check if Python of version 3 or above is installed in your system.
  Run `python --version` and check if the output is similar to `Python 3.13.0`
- Make sure your IDE is opened at the directory of `App/backend/rewire`.
### Create a Python virtual environment
- If this is the first time you are using virtual environments, run the following command to install it
  ```bash
  pip install virtualenv
  ```
- Create a virtual environment of named `.venv` in the directory of `App/backend/rewire`
  ```bash
  python -m venv .venv
  ```
- Check if a folder named `.venv` is present in your current directory to confirm that the virtual environment is created successfully
- Activate the virtual environment
  - For Mac or Linux
  ```bash
  source .venv/bin/activate
  ```
  - For Windows PowerShell
  ```bash
  .venv/Scripts/Activate.ps1
  ```
  - For Windows Command Prompt (CMD)
  ```bash
  C:/Users/<USER>/<PATH>/App/backend/rewire/.venv/Scripts/activate.bat
  ```
- After this process prompt of the CLI you are using should be prefixed wih `(.venv)`.
  This means any Python command you run in that CLI uses the virtual environemnt.
### Install required Python packages
- All the necessary packages are listed in the `requirements.txt`.
- This file is supposed to be auto-generated, and shouldn't be manually edited.
- To install the packages, run the following command.
  ```bash
  pip install -r requirements.txt
  ```
### Configure Database
- You need to have a PostgreSQL database to be running in the background to initialize the backend system
- Configuration of the database is out of scope of this guide. So please refer suitable guide for that process
- The passwords and usernames where the database needs to have are included in the `env` file that will be shared to you (it is not included in this repository for obvious security reasons)

### A quick check
- Run the following command
  ```bash
  python manage.py runserver 8000
  ```
- If you see an output similar to the following, that means you are on the right track!
  ```
  Watching for file changes with StatReloader
  Performing system checks...
  
  System check identified no issues (0 silenced).
  
  You have 18 unapplied migration(s). Your project may not work properly until you apply the migrations for app(s): admin, auth, contenttypes, sessions.
  Run 'python manage.py migrate' to apply them.
  February 10, 2025 - 18:56:55                                                                                                                                                    
  Django version 5.1.6, using settings 'admin.settings'
  Starting development server at http://0.0.0.0:8000/                                                                                                                             
  Quit the server with CONTROL-C.
  ```
- To stop the server enter `Ctrl+C`.

## Managing Migrations
- Once you have started running the server for the first time (with Docker or without Docker) you are expected to see the following warning,
  ```
  You have 18 unapplied migration(s). Your project may not work properly until you apply the migrations for app(s): admin, auth, contenttypes, sessions.
  Run 'python manage.py migrate' to apply them.
  ```
- To resolve this follow the following procedure
- If you are using Docker, open another terminal at the same directory location and run the following command to enter the docker shell
  ```bash
  docker-compose exec rewire sh
  ```
- Next run the following set of commands one after another
  ```bash
  python manage.py makemigrations core
  ```
  ```bash
  python manage.py migrate
  ```
- You should get a output with all OKs
- Now restart your server, and you should see the warning has disappeared.
