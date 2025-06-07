require('dotenv').config({ path: '.env.local' });


const cors = require('cors');
const express = require('express');
const path = require('path');

const userRouter = require('./routes/user.route');
const companyRouter = require('./routes/company.route');
const constructionRouter = require('./routes/construction.route');
const planRouter = require('./routes/plan.route');
const planInformationRouter = require('./routes/plan_informatiion.route');
const typeOfWorkRouter = require('./routes/type_of_work.route');
const statusRouter = require('./routes/status.route');
const houseRouter = require('./routes/house.route');
const uploadRouter = require('./routes/upload');

const PORT = process.env.SERVER_PORT || 5000;
const CLIENT_LINK = process.env.CLIENT_LINK || "https://andreipolisciuc.github.io";

const app = express();

app.use(cors({
    origin: CLIENT_LINK,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));


app.use(express.json());
app.use('/api', userRouter);
app.use('/api', companyRouter);
app.use('/api', constructionRouter);
app.use('/api', planRouter);
app.use('/api', planInformationRouter);
app.use('/api', typeOfWorkRouter);
app.use('/api', statusRouter);
app.use('/api', houseRouter);
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use('/api/upload', uploadRouter);

app.listen(PORT, () => {
    console.log(`✅ Server is running at ${PORT}`);
});
