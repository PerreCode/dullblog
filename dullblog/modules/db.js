
// setup connection -------------------------
const pg = require('pg');
const dbURI = "postgres://mnbfdpqccgzaez:fb244c26dfe3ae1b6650a80e971d65704be8f7701d9b167879cac3cdf50d8ccb@ec2-34-253-116-145.eu-west-1.compute.amazonaws.com:5432/d71lpcl7r9f4b0";
const connstring  = process.env.DATABASE_URL || dbURI;
const pool = new pg.Pool({
    connectionString: connstring,
    ssl: { rejectUnauthorized: false }
 });

// database methods -------------------------
let dbMethods = {}; //create empty object

// ------------------------------------
dbMethods.getAllBlogPosts = function() {
    let sql = "SELECT * FROM blogposts";	
	return pool.query(sql); //return the promise	
}

// ------------------------------------
dbMethods.createBlogPost = function(heading, blogtext, userid) {  
    let sql = "INSERT INTO blogposts (id, date, heading, blogtext, userid) VALUES(DEFAULT, DEFAULT, $1, $2, $3) returning *";
	let values = [heading, blogtext, userid];	
    return pool.query(sql, values); //return the promise
}

// ------------------------------------
dbMethods.deleteBlogPost = function(id) {  
    let sql = "DELETE FROM blogposts WHERE id = $1 RETURNING *";
	let values = [id];	
    return pool.query(sql, values); //return the promise
}

// export dbMethods -------------------------
module.exports = dbMethods;

