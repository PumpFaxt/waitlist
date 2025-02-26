import os
import subprocess

def parse_wrangler_toml(file_path, binding_name):
    with open(file_path, "r") as file:
        lines = file.readlines()

    database_name = None
    migrations_dir = None
    in_d1_section = False

    for line in lines:
        line = line.strip()
        if line.startswith("[[ d1_databases ]]"):
            in_d1_section = True
        elif line.startswith("[") and in_d1_section:
            break
        elif in_d1_section:
            if line.startswith("binding"):
                key, value = line.split("=")
                value = value.strip().strip('"')
                if value != binding_name:
                    in_d1_section = False
            elif line.startswith("database_name"):
                key, value = line.split("=")
                database_name = value.strip().strip('"')
            elif line.startswith("migrations_dir"):
                key, value = line.split("=")
                migrations_dir = value.strip().strip('"')

    return database_name, migrations_dir

def find_latest_migration(migrations_dir):
    try:
        files = os.listdir(migrations_dir)
        migration_files = [f for f in files if f.endswith(".sql")]
        if not migration_files:
            return None
        latest_migration = max(migration_files)
        return latest_migration
    except FileNotFoundError:
        return None

if __name__ == "__main__":
    toml_file_path = "./wrangler.toml"
    binding_name = "DB"

    database_name, migrations_dir = parse_wrangler_toml(toml_file_path, binding_name)

    if database_name:
        print(f"Database Name: {database_name}")
    else:
        raise("No database found for binding") 

    if migrations_dir:
        latest_migration = find_latest_migration(migrations_dir)
        if latest_migration:
            print(f"Latest Migration: {latest_migration}")
        else:
            raise("No migration files found")
    else:
        raise("Migrations directory not specified")
    
    migration_file = migrations_dir + "/" + latest_migration
    cmd = " ".join(["bunx", "wrangler", "d1", "execute", database_name, "--local", f"--file=./{migration_file}"])

    subprocess.run(cmd, shell=True, check=True)
    
    print("Migration executed successfully")