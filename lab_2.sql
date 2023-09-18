create table client (
    id SERIAL PRIMARY KEY,
    name TEXT,
    surname TEXT
)

create table zayavka (
    id SERIAL PRIMARY KEY,
    zagolovok TEXT,
    opisanie TEXT,
    client_id INTEGER,
    FOREIGN KEY (client_id) REFERENCES client(id)
)

create table usluga (
    id SERIAL PRIMARY KEY,
    zagolovok TEXT,
    opisanie TEXT,
    zayavka_id INTEGER,
    FOREIGN KEY (zayavka_id) REFERENCES zayavka(id)
)