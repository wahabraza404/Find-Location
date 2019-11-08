import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);
const database_name = 'Reactoffline.db';
const database_version = '1.0';
const database_displayname = 'SQLite React Offline Database';
const database_size = 200000;
export default class Database {
  initDB() {
    let db;
    return new Promise(resolve => {
      console.log('Plugin integrity check ...');
      SQLite.echoTest()
        .then(() => {
          console.log('Integrity check passed ...');
          console.log('Opening database ...');
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
          )
            .then(DB => {
              db = DB;
              console.log('Database OPEN');
              db.executeSql('SELECT 1 FROM Product LIMIT 1')
                .then(() => {
                  console.log('Database is ready ... executing query ...');
                })
                .catch(error => {
                  console.log('Received error: ', error);
                  console.log('Database not yet ready ... populating data');
                  db.transaction(tx => {
                    tx.executeSql(
                      'CREATE TABLE IF NOT EXISTS User (UserId, name, email, password)',
                    );
                  })
                    .then(() => {
                      console.log('Table created successfully');
                    })
                    .catch(error => {
                      console.log(error);
                    });
                });
              resolve(db);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log('echoTest failed - plugin not functional');
        });
    });
  }
  closeDatabase(db) {
    if (db) {
      console.log('Closing DB');
      db.close()
        .then(status => {
          console.log('Database CLOSED');
        })
        .catch(error => {
          this.errorCB(error);
        });
    } else {
      console.log('Database was not OPENED');
    }
  }
  listProduct() {
    return new Promise(resolve => {
      const products = [];
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              'SELECT p.prodId, p.prodName, p.prodImage FROM Product p',
              [],
            ).then(([tx, results]) => {
              console.log('Query completed');
              // var len = results.rows.length;
              // for (let i = 0; i < len; i++) {
              //   let row = results.rows.item(i);
              //   console.log(
              //     `Prod ID: ${row.prodId}, Prod Name: ${row.prodName}`,
              //   );
              //   const {prodId, prodName, prodImage} = row;
              //   products.push({
              //     prodId,
              //     prodName,
              //     prodImage,
              //   });
              // }
              // console.log(products);
              // resolve(products);
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
  addUser(prod) {
    return new Promise(resolve => {
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('INSERT INTO Product VALUES (name,email,password)', [
              prod.name,
              prod.email,
              prod.password,
            ]).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
}
