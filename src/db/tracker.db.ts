// import * as SQLite from 'react-native-quick-sqlite';

// const database = SQLite.open({
//   name: 'shopping',
// });

// export function init() {
//   return new Promise((resolve, reject) => {
//     database.transaction(tx => {
//       tx.executeAsync(
//         `CREATE TABLE IF NOT EXISTS tracker (
//                 id INTEGER PRIMARY KEY AUTOINCREMENT,
//                 description TEXT,
//                 start_date INTEGER,
//                 end_date INTEGER,
//                 lat_start REAL,
//                 lng_start REAL,
//                 lat_end REAL,
//                 lng_end REAL,
//                 geojson TEXT,
//                 created_at INTEGER NOT NULL,
//                 updated_at INTEGER,
//                 created_by TEXT NOT NULL,
//                 updated_by TEXT
//             )`,
//         [],
//       )
//         .then(result => {
//           console.log(result);
//           resolve(result);
//         })
//         .catch(error => {
//           console.log(error);
//           reject(error);
//         });
//     });
//   });
// }
