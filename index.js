const http = require('http');
const app = require('./app');
const server = http.createServer(app);
const mongoose = require('mongoose');
const MONGO_URI = "mongodb+srv://giangle:root@cheatsheet.l6veb.mongodb.net/test";

const SERVER_PORT = 9000;
mongoose
    .connect(MONGO_URI)

    .then(() =>
        server.listen(SERVER_PORT, () => {
            console.log(
                `Server running on port ${SERVER_PORT}. Database successfully connected`
            );
            // pythonCatJSON.map(async (element, index) => {
            //     var langID = await language.language.findOne({
            //             name: "Python"
            //         }   
            //     )
            //     console.log(langID)
            //     category.category.create(
            //         { language_id: langID,
            //             name: element.name },
            //         function (error, data) {
            //             if (error) {
            //                 console.log(error);
            //             } else {
            //                 console.log(data);
            //             }
            //         }
            //     );
            // });

            // pythonFuncJSON.map(async (element, index) => {
            //     var cateID = await category.category.findOne({
            //             name: element.category
            //         }   
            //     )
            //     element.func_list.map((ele) =>{
            //         functionModel.function.create(
            //             { category_id: cateID,
            //                 name: ele.func,
            //                 description: ele.desc,
            //                 params: ele.params,
            //                 example_question: ele.eg_question,
            //                 example_result: ele.result,
            //                 more_detail: ele.details_link },
            //             function (error, data) {
            //                 if (error) {
            //                     console.log(error);
            //                 } else {
            //                     console.log(data);
            //                 }
            //             }
            //         );
            //     })

            // });

            // jsCatJSON.map(async (element, index) => {
            //     var langID = await language.language.findOne({
            //             name: "JavaScript"
            //         }   
            //     )
            //     category.category.create(
            //         { language_id: langID,
            //             name: element.name },
            //         function (error, data) {
            //             if (error) {
            //                 console.log(error);
            //             } else {
            //                 console.log(data);
            //             }
            //         }
            //     );
            // });

            // jsFuncJSON.map(async (element, index) => {
            //     var langID = await language.language.findOne({
            //                     name: "JavaScript"
            //                 }   
            //     )
            //     var cateID = await category.category.findOne({
            //             name: element.category,
            //             language_id: langID
            //         }   
            //     )
            //     element.func_list.map((ele) =>{
            //         functionModel.function.create(
            //             { category_id: cateID,
            //                 name: ele.func,
            //                 description: ele.desc,
            //                 params: ele.params,
            //                 example_question: ele.eg_question,
            //                 example_result: ele.result,
            //                 more_detail: ele.details_link },
            //             function (error, data) {
            //                 if (error) {
            //                     console.log(error);
            //                 } else {
            //                     console.log(data);
            //                 }
            //             }
            //         );
            //     })

            // });

            // javaCatJSON.map(async (element, index) => {
            //     var langID = await language.language.findOne({
            //             name: "Java (java.util Package)"
            //         }   
            //     )
            //     category.category.create(
            //         { language_id: langID,
            //             name: element.name },
            //         function (error, data) {
            //             if (error) {
            //                 console.log(error);
            //             } else {
            //                 console.log(data);
            //             }
            //         }
            //     );
            // });

            // javaFuncJSON.map(async (element, index) => {
            //     var langID = await language.language.findOne({
            //                     name: "Java (java.util Package)"
            //                 }   
            //     )
            //     var cateID = await category.category.findOne({
            //             name: element.category,
            //             language_id: langID
            //         }   
            //     )
            //     element.func_list.map((ele) =>{
            //         functionModel.function.create(
            //             { category_id: cateID,
            //                 name: ele.func,
            //                 description: ele.desc,
            //                 params: ele.params,
            //                 example_question: ele.eg_question,
            //                 example_result: ele.result,
            //                 more_detail: ele.details_link },
            //             function (error, data) {
            //                 if (error) {
            //                     console.log(error);
            //                 } else {
            //                     console.log(data);
            //                 }
            //             }
            //         );
            //     })

            // });
        })
    )
    .catch((error) => console.log(error.message));