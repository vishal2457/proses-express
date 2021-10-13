# Proses Express

An extension to express framework tailored for our business needs.

## Installation

```bash
npm install proses-express
```

## Usage

```javscript
const express = require("proses-express");

let options = {
encryption: "encryption-key",
socket: 9000,
logging: true,
mail: {nodemailer, configurations}
multer: true
}

let app = express(options);

//use express as you know it super-powerful

app.listen(port, () => console.log(`server started`))
```
## Options


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)