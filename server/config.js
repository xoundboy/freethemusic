module.exports = {

    SERVER_PORT:            process.env.X71_SERVER_PORT,

    AUDIO_UPLOAD_DIR_PATH:  './public/uploads/audio',
    IMAGE_UPLOAD_DIR_PATH:  './public/uploads/images',
    AUDIO_LIBRARY_PATH:     process.env.X71_LIB_PATH + "/audio/",
    IMAGE_LIBRARY_PATH:     process.env.X71_LIB_PATH + "/images/",

    DB_HOST:                process.env.X71_DB_HOST,
    DB_NAME:                process.env.X71_DB_NAME,
    DB_USER:                process.env.X71_DB_USER,
    DB_PASS:                process.env.X71_DB_PASS,

    base64SigningKey:       "NSUiBDr4nnAWif8GujmI3AHZThT8i8Q7NawJ3jk/Zp+uEyYE4d5/CjXsPxYvsSuu8b8jyDqmz1GQJJOi+MpRV6thrOoZgeHUQSYiTXscSm6Fv4vJIJ26X3HoOUsFX2ja8bWGi1Lv43/rJ5kYCgZEyDr8WVFam1oUSFO9sB34WdhSgkbTiPm8Z3edWI2+Qt1dzAyu5rZhXTgHyKU0dtQgs6aJ5F/94QiGDcwdD/c4JagBTDyqDgLpqGdGfNF2jlEqq2rQno7ga6sLZyoCNh6lF663MnKONx8+tb7ptwac+S+lUy3IBK23d2trTVYo5L0XGVHg1+5uijhER7OsN0Y9Ew==",
    VALID_AUTH_SCOPE:       'admins',
    disableAuth:            true

};