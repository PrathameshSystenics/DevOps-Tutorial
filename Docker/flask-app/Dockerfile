# Specify the base image
FROM python:3.14-alpine3.23

# Defining the Labels (in single command)
LABEL com.example.author="Prathamesh" \
      com.example.description="A simple Flask application" \
      com.example.version=1.0 \
      com.example.license="MIT" \
      tutorial="flask"

# Run command to execute the commands on the base image
RUN echo "Hello World"

# Setting the current working directory
WORKDIR /app

# Setup the UV
# Download the latest installer
ADD https://astral.sh/uv/0.11.24/install.sh /uv-installer.sh
RUN sh /uv-installer.sh && rm /uv-installer.sh
ENV PATH="/root/.local/bin/:$PATH"

# Setting the Environment variable
ENV FLASK_APP=app.py \
      FLASK_ENV=development \
      UV_SYSTEM_PYTHON=true

# Copy source code
COPY pyproject.toml /app/

# Install the Project Dependencies
RUN uv pip install --system .

# Copy source code
COPY . /app/

# Expose the Port
EXPOSE 8080
ENTRYPOINT ["waitress-serve"]
CMD ["--host", "0.0.0.0", "app:app"]