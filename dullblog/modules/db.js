// setup connection -------------------------
const pg = require('pg');
const dbURI = "postgres://mnbfdpqccgzaez:fb244c26dfe3ae1b6650a80e971d65704be8f7701d9b167879cac3cdf50d8ccb@ec2-34-253-116-145.eu-west-1.compute.amazonaws.com:5432/d71lpcl7r9f4b0";
const connstring=process.env.DATABASE_URL||dbURI;
const pool = new pg.Pool({
    connectionString: connstring,
    ssl: { rejectUnauthorized: false}
});

// database methods -------------------------
let dbMethods = {}; //create empty object

// ------------------------------------
dbMethods.getAllBlogPosts = function(){
    let sql = "SELECT * FROM blogposts";	
	return pool.query(sql); // return the promise	
}

// ------------------------------------
dbMethods.createBlogPosts = function(heading, blogtext, userid) {  
    let sql = "INSERT INTO blogposts (id, date, heading, blogtext, userid) VALUES(DEFAULT, DEFAULT, $1, $2, $3) returning *";
	let values = [heading, blogtext, userid];	
    return pool.query(sql, values); // return the promise
}

// ------------------------------------
dbMethods.deleteBlogPost = function(id, userid){  
    let sql = "DELETE FROM blogposts WHERE id = $1 AND userid = $2 RETURNING *";
	let values = [id, userid];	
    return pool.query(sql, values); // return the promise
}

// --------------------------------
dbMethods.getAllUsers = function (){
    let sql = "SELECT id, username FROM users";
    return pool.query(sql);
}

// -------------------------
dbMethods.getUser = function(username){
    let sql = "SELECT * FROM users WHERE username = $1";
    let values = [username];
    return pool.query(sql, values);
}

// -------------------------
dbMethods.createUser = function(username, password, salt){
    let sql = "INSERT INTO users (id, username, password, salt) VALUES(DEFAULT, $1, $2, $3) returning *";
    let values = [username, password, salt];
    return pool.query(sql, values);
}

// -------------------------
dbMethods.deleteUser = function(id){
    let sql = "DELETE FROM users WHERE id = $1 RETURNING *";
    let values = [id];
    return pool.query(sql, values);
}

// export dbMethods -------------------------
module.exports = dbMethods;

