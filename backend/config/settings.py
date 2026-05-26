from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.environ.get(
    "SECRET_KEY",
    "django-secret-key"
)

DEBUG = os.environ.get(
    "DEBUG",
    "True"
) == "True"

ALLOWED_HOSTS = [
    "breathe-esg-backend-m7vp.onrender.com",
    "localhost",
    "127.0.0.1",
]

INSTALLED_APPS = [

    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    "rest_framework",

    "corsheaders",

    "companies",
    "ingestion",
    "emissions",
    "audits",
]

MIDDLEWARE = [

    "django.middleware.security.SecurityMiddleware",

    "corsheaders.middleware.CorsMiddleware",

    "django.contrib.sessions.middleware.SessionMiddleware",

    "django.middleware.common.CommonMiddleware",

    "django.middleware.csrf.CsrfViewMiddleware",

    "django.contrib.auth.middleware.AuthenticationMiddleware",

    "django.contrib.messages.middleware.MessageMiddleware",

    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND":
        "django.template.backends.django.DjangoTemplates",

        "DIRS": [],

        "APP_DIRS": True,

        "OPTIONS": {
            "context_processors": [

                "django.template.context_processors.request",

                "django.contrib.auth.context_processors.auth",

                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"

DATABASES = {
    "default": {
        "ENGINE":
        "django.db.backends.postgresql",

        "NAME":
        "breathe_esg_db",

        "USER":
        "postgres",

        "PASSWORD":
        "postgres",

        "HOST":
        "localhost",

        "PORT":
        "5432",
    }
}

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True

STATIC_URL = "static/"

DEFAULT_AUTO_FIELD = (
    "django.db.models.BigAutoField"
)

CORS_ALLOWED_ORIGINS = [
    "https://breathe-esg-platform-flax.vercel.app",
]

CSRF_TRUSTED_ORIGINS = [
    "https://breathe-esg-platform-flax.vercel.app",
]