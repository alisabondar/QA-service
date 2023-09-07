# #!/bin/bash

# DB_NAME="q_a"
# DB_USER="postgres"
# DB_PASSWORD="post123"

# if psql -lqt | cut -d \| -f 1 | grep -wq "$DB_NAME"; then
#   echo "Database '$DB_NAME' already exists. Skipping creation."
# else
#   echo "Creating database '$DB_NAME'..."
#   psql -U postgres -c "CREATE DATABASE $DB_NAME"

#   echo "Creating user '$DB_USER'..."
#   psql -U postgres -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD'"
# fi

# echo "Database setup complete."