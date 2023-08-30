import {
  doc,
  addDoc,
  collection,
  collectionGroup,
  serverTimestamp,
  getDoc,
  getDocs,
  onSnapshot,
  where,
  limit,
  query,
  orderBy,
  startAt,
  startAfter,
  endAt,
  endBefore,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  writeBatch,
  deleteDoc,
  getCountFromServer,
} from "firebase/firestore";
import firebaseDb from "./init";

const batch = writeBatch(firebaseDb);

export default class Query {
  static get DEFAULT_LIMIT() {
    return 5000;
  }
  constructor(path, ref, conditions) {
    this.path = path || null;
    this.ref = ref || null;
    this.conditions = conditions || {
      where: [],
      limit: null,
      orderBy: [],
      startAt: [],
      endAt: [],
      push_array: [],
    };
  }

  async getId() {
    //条件初期化
    this.conditions.where = [];
    const ref = doc(this.ref);
    return ref.id;
  }

  async getOneDoc(id) {
    //条件初期化
    this.conditions.where = [];
    this.ref = doc(firebaseDb, this.path, id);
    const docSnap = await getDoc(this.ref);
    if (docSnap.exists()) {
      //console.log(docSnap);
      let data = docSnap.data();
      let id = docSnap.id;
      return { doc_id: id, ...data };
    } else {
      //console.log(docSnap);
      return false;
    }
  }

  async getAll() {
    let setData = setConditions(this);
    Object.assign(this, setData);
    const docSnap = await getDocs(this.ref);
    if (docSnap.size) {
      //console.log("キャッシュ:", docSnap.metadata.fromCache);
      //console.log("ペンディング:", docSnap.metadata.hasPendingWrites);
      const res = await Promise.all(
        docSnap.docs.map(async (d) => {
          let data = d.data();
          let id = d.id;
          return { doc_id: id, ...data };
        })
      );
      //console.log(res);
      return res;
    } else {
      console.log("対象データなし");
      return [];
    }
  }

  async count() {
    //limit(Query.DEFAULT_LIMIT)
    this.conditions.limit = Query.DEFAULT_LIMIT;
    let setData = await setConditions(this);
    Object.assign(this, setData);
    //console.log(this);
    let count = await getCountFromServer(this.ref);
    //console.log("count:", count.data());
    return count.data();
  }

  setCollectionPath(path) {
    this.conditions.where = [];
    this.conditions.orderBy = [];
    this.conditions.limit = Query.DEFAULT_LIMIT;
    this.path = path;
    // single path = "collection"
    // sub collection path = "collection/doc/collection2"
    if (!path.includes("/")) {
      this.ref = collection(firebaseDb, path);
    } else {
      //sub collection
      this.ref = collection(firebaseDb, ...path.split("/"));
    }
    return new Query(this.path, this.ref, this.conditions);
  }

  setCollectionGroupPath(path) {
    this.conditions.where = [];
    this.conditions.orderBy = [];
    this.conditions.limit = Query.DEFAULT_LIMIT;
    this.path = path;
    // single path = "collection"
    // sub collection path = "collection/doc/collection2"
    if (!path.includes("/")) {
      this.ref = collectionGroup(firebaseDb, path);
    } else {
      //sub collection
      this.ref = collection(firebaseDb, ...path.split("/"));
    }
    return new Query(this.path, this.ref, this.conditions);
  }

  where(field, operator, value) {
    this.conditions.where.push(where(field, operator, value));
    return new Query(this.path, this.ref, this.conditions);
  }
  limit(num) {
    this.conditions.limit = limit(num);
    return new Query(this.path, this.ref, this.conditions);
  }
  orderBy(field, sort = "asc") {
    this.conditions.orderBy.push(orderBy(field, sort));
    return new Query(this.path, this.ref, this.conditions);
  }

  startAt(date) {
    this.conditions.startAt = [];
    this.conditions.startAt.push(startAt(date));
    return new Query(this.path, this.ref, this.conditions);
  }

  endAt(date) {
    this.conditions.endAt = [];
    this.conditions.endAt.push(endAt(date));
    return new Query(this.path, this.ref, this.conditions);
  }

  pushArray(field, array) {
    this.conditions.push_array = [];
    this.conditions.push_array.push({ [field]: arrayUnion(...array) });
    return new Query(this.path, this.ref, this.conditions);
  }

  getOneSnapshot(id = null) {
    if (!!id) {
      this.ref = doc(firebaseDb, this.path, id);
    }
    return this.ref;
  }

  // getSnapshot() {
  //   return this.ref;
  // }

  async setOne(data) {
    //console.log(this.ref, data);
    return await addDoc(this.ref, data)
      .then((res) => {
        return res;
      })
      .catch((e) => e);
  }

  async setOneDoc(id, data) {
    //console.log(doc(firebaseDb, this.ref, typeof id));
    //return setDoc(doc(firebaseDb, "users", "IhpilO2uoAxPjq28vZWaEyjJt2jA"), { test: 1, test2: 3 }, { merge: true }).then((res) => res);
    return await setDoc(doc(this.ref, id), data, { merge: true })
      .then(() => {
        return this.ref;
      })
      .catch((e) => e);
  }

  async updateDoc(id, data) {
    if (this.conditions.push_array.length > 0) {
      this.conditions.push_array.forEach((obj) => {
        Object.assign(data, obj);
      });
    }
    return await updateDoc(doc(this.ref, id), data);
  }
  ///配列型に追加
  async arrayUnion(id, property, data) {
    return await updateDoc(doc(this.ref, id), { [property]: arrayUnion(data) });
    //await updateDoc(washingtonRef, {regions: arrayUnion("greater_virginia")
  }

  async deleteDoc(id) {
    //console.log(this.ref, id);
    let res = await deleteDoc(doc(this.ref, id));
    console.log(res);
  }
}

async function setConditions(data) {
  if (data.conditions.limit == null) {
    data.conditions.limit = limit(Query.DEFAULT_LIMIT);
  }

  data.ref = query(data.ref, data.conditions.limit);

  if (data.conditions.where.length) {
    data.ref = query(data.ref, ...data.conditions.where);
  }

  if (data.conditions.orderBy.length) {
    data.ref = query(data.ref, ...data.conditions.orderBy);
  }

  if (data.conditions.startAt.length) {
    data.ref = query(data.ref, ...data.conditions.startAt);
  }

  if (data.conditions.endAt.length) {
    data.ref = query(data.ref, ...data.conditions.endAt);
  }
  return data;
}
