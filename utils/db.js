import * as SQLite from "expo-sqlite";
import Review from "../models/Review";

const db = SQLite.openDatabase("myGamesReview.db");

export const initDB = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS gameReview (
                    id INTEGER PRIMARY KEY NOT NULL,
                    title TEXT NOT NULL,
                    releaseDate TEXT NOT NULL,
                    metaCritic INTEGER,
                    genres TEXT,
                    backgroundImage TEXT NOT NULL,
                    review TEXT NOT NULL
                )`,
        [],
        (res) => resolve(res),
        (_, err) => reject(err)
      );
    });
  });
};

export const getTableInfo = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `pragma table_info('gameReview')`,
        [],
        (_, res) => resolve(res),
        (_, err) => reject(err)
      );
    });
  });
};

export const insert = (game) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO gameReview (title, releaseDate, metaCritic, genres, backgroundImage, review) VALUES (?,?)`,
        [
          game.title,
          game.releaseDate,
          game.metaCritic,
          game.genres,
          game.backgroundImage,
          game.review,
        ],
        (_, res) => resolve(res),
        (_, err) => reject(err)
      );
    });
  });
};

export const findAll = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM gameReview`,
        [],
        (_, res) =>
          resolve(
            res.rows._array.map(
              (row) =>
                new Review(
                  row.id,
                  row.title,
                  row.releaseDate,
                  row.metaCritic,
                  row.genres,
                  row.backgroundImage,
                  row.review
                )
            )
          ),
        (_, err) => reject(err)
      );
    });
  });
};

export const deleteById = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM gameReview WHERE id = ?`,
        [id],
        (_, res) => resolve(res),
        (_, err) => reject(err)
      );
    });
  });
};
