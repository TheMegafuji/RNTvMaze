import PouchDB from 'pouchdb-react-native';
import find from 'pouchdb-find';
import upsert from 'pouchdb-upsert';

const getDatabase = collection => {
  PouchDB.plugin(find);
  PouchDB.plugin(upsert);
  return new PouchDB(collection);
};

const destroyDatabase = async collection => {
  const db = await getDatabase(collection);

  db.destroy(function(err, response) {
    if (err) {
      return console.log(err);
    } else {
      console.log(`Database ${collection} Deleted`);
    }
  });
};

const getAll = async collection => {
  const db = await getDatabase(collection);

  try {
    const allDocs = await db.allDocs();

    const result = allDocs.rows.map(doc => {
      return doc.doc;
    });
    return result;
  } catch (err) {
    console.log('getAll error ->', err);
  }
};

const getBy = async (collection, key, value) => {
  const db = await getDatabase(collection);
  let query = {};
  query[`${key}`] = {$eq: value};

  return db
    .find({
      selector: query,
    })
    .then(function(result) {
      return result.docs;
    })
    .catch(function(err) {
      console.log('getBy error ->', err);
      return [];
    });
};

const getByMultiParams = async (collection, keys, values) => {
  const db = await getDatabase(collection);
  let query = {};
  keys.forEach((key, index) => {
    query[`${key}`] = {$eq: values[index]};
  });

  return db
    .find({
      selector: query,
    })
    .then(function(result) {
      return result.docs;
    })
    .catch(function(err) {
      console.log('getMulti error ->', err);
    });
};

const insert = async (doc, collection) => {
  const db = await getDatabase(collection);

  await db
    .upsert(doc._id, function(actualDoc) {
      if (
        doc.dti &&
        actualDoc.dti &&
        JSON.stringify(doc.dti) == JSON.stringify(doc.dti) &&
        Object.keys(doc) == Object.keys(actualDoc)
      ) {
        return false;
      }

      return {
        ...actualDoc,
        ...doc,
      };
    })
    .then(function(res) {
      return res;
    })
    .catch(function(err) {
      console.log('insert error ->', err);
    });

  return null;
};

const remove = async (object, collection) => {
  const db = await getDatabase(collection);

  await db
    .get(object._id)
    .then(function(doc) {
      doc._deleted = true;
      return db.remove(doc);
    })
    .catch(function(err) {
      console.log('get error ->', err);
    });
};

const database = {
  getAll,
  getBy,
  getByMultiParams,
  insert,
  destroyDatabase,
  remove,
};

export default database;
