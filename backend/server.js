import express from 'express';
import mongodb from 'mongodb';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
const dbUrl = 'mongodb://localhost/userdatabase';

function validate(data) {
    let errors = {};
    if (data.id === '') errors.id = "Can't be empty";
    if (data.email === '') errors.email = "Can't be empty";
    if (data.firstName === '') errors.firstName = "Can't be empty";
    if (data.lastName === '') errors.lastName = "Can't be empty";
    if (data.jobTitle === '') errors.jobTitle = "Can't be empty";
    if (data.birthday === '') errors.birthday = "Can't be empty";
    this.setState({ errors });
    const isValid = Object.keys(errors).length === 0
    return { errors, isValid };
}

mongodb.MongoClient.connect(dbUrl, function(err, db) {

    app.get('/api/users', (req, res) => {
        db.collection('users').find({}).toArray((err, users) => {
            res.json({ users });
        });  
    });

    app.post('/api/users', (req, res) => {
        const { errors, isValid } = validate(req.body);
        if (isValid) {
            const { id, email, firstName, lastName, jobTitle, birthday } = req.body;
            db.collection('users').insert({ id, email, firstName, lastName, jobTitle, birthday }, (err, result) => {
                if (err) {
                    res.status(500).json({ errors: { global: "Something went wrong." }});
                } else {
                    res.json({ user: result.ops[0] })
                }
            })
        } else {
            res.status(400).json({ errors });
        }
    })

    app.use((req, res) => {
        res.status(404).json({
            errors: {
                global: "Stil working on it. Please try again later."
            }
        });
    })

    app.listen(8080, () => console.log('Server is running on localhost:8080'));

});

