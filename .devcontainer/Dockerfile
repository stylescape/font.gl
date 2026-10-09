# syntax=docker/dockerfile:1.4


# Base Image
# =============================================================================

FROM ghcr.io/stylescape/stylescape-devcontainer/devcontainer:latest


# The project is bind-mounted at /workspace and `postCreateCommand` runs
# `npm install`, so the image copies no project files.

# Make port available to the world outside this container
EXPOSE 3000

# Start Command
# =============================================================================
# Define the command to run your app
# CMD [ "npm", "start" ]
CMD ["/usr/local/bin/start.sh"]