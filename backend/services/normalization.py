UNIT_MAPPING = {
    "litres": "L",
    "liter": "L",
    "ltr": "L",
    "l": "L",
    "kwh": "kWh",
}


def normalize_unit(unit):

    if not unit:
        return None

    unit = unit.lower().strip()

    return UNIT_MAPPING.get(unit, unit)


def detect_scope(category):

    category = category.lower()

    if "diesel" in category:
        return "Scope 1"

    if "electricity" in category:
        return "Scope 2"

    if "flight" in category:
        return "Scope 3"

    return "Unknown"


def detect_status(quantity):

    if quantity > 100000:
        return "FLAGGED"

    return "PENDING"