const fs =  require("fs")

// fs.writeFile('log.txt', "logs saved here", (err) => {
//     if (err){
//         throw err;
//     }

//     console.log('file created succesfully');

// });

fs.readFile('log.txt', 'utf8' ,(err, data) => {
    if (err){
        throw err;
    }
        
    console.log('file read succesfully', data);
        
})