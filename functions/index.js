const functions = require('firebase-functions');
const admin = require('firebase-admin')

admin.initializeApp()

const db = admin.firestore()
const runtimeOpts = {
  timeoutSeconds: 30,
  memory: '2GB'
}
const regionOpts = "asia-southeast1"

exports.AddUserRole = functions.region(regionOpts).runWith(runtimeOpts).auth.user().onCreate(async (authUser) => {

    if (authUser.email) {
      const customClaims = { isRegisted: true };
      try {
        var _ = await admin.auth().setCustomUserClaims(authUser.uid, customClaims)
  
        // return db.collection("teacher").doc(authUser.uid).set({
        //   registed: Date.now(),
        //   userId: authUser.uid,
        //   profileDetail: false,
        //   role: customClaims,
        // })
  
      } catch (error) {
        console.log(error)
      }
  
    }
  
});


exports.TeacherData = functions.region(regionOpts).runWith(runtimeOpts).https.onCall(async (data, context) => {

  // if (!context.auth.token.isAdmin) return
  try {
    const customClaims = { isProfile: true };
    var _ = await admin.auth().setCustomUserClaims(data.uid, customClaims)
    return db.collection("teacherData").doc(data.uid).set(data)
  }
  catch (error) {
    console.log(error)
  }

});

exports.EmployeeData = functions.region(regionOpts).runWith(runtimeOpts).https.onCall(async (data, context) => {

  // if (!context.auth.token.isAdmin) return
  try {
    const customClaims = { isProfile: true };
    var _ = await admin.auth().setCustomUserClaims(data.uid, customClaims)
    return db.collection("employeeData").doc(data.uid).set(data)
  }
  catch (error) {
    console.log(error)
  }

});

exports.StudentData = functions.region(regionOpts).runWith(runtimeOpts).https.onCall(async (data, context) => {

  // if (!context.auth.token.isAdmin) return
  try {
    const customClaims = { isStudent: true };
    var _ = await admin.auth().setCustomUserClaims(data.uid, customClaims)
    return db.collection("studentData").doc(data.uid).set(data)
  }
  catch (error) {
    console.log(error)
  }

});

exports.ApproveTeacher = functions.region(regionOpts).runWith(runtimeOpts).https.onCall(async (data, context) => {

  // if (!context.auth.token.isAdmin) return
  try {
    const customClaims = { isTeacher: true };
    var _ = await admin.auth().setCustomUserClaims(data.uid, customClaims)
    return db.collection("teacherData").doc(data.uid).update({role:customClaims})
  }
  catch (error) {
    console.log(error)
  }

});

exports.ApproveEmployee = functions.region(regionOpts).runWith(runtimeOpts).https.onCall(async (data, context) => {

  // if (!context.auth.token.isAdmin) return
  try {
    const customClaims = { isEmployee: true };
    var _ = await admin.auth().setCustomUserClaims(data.uid, customClaims)
    return db.collection("employeeData").doc(data.uid).update({role:customClaims})
  }
  catch (error) {
    console.log(error)
  }

});

exports.deleteTeacher = functions.region(regionOpts).runWith(runtimeOpts).https.onCall(async (data, context) => {

  if (!context.auth.token.isAdmin) return
  try {
    var _ = await admin.auth().deleteUser(data.uid);
    return db.collection("teacherData").doc(data.uid).delete();
  }
  catch (error) {
    console.log(error)
  }

});

exports.deleteEmployee = functions.region(regionOpts).runWith(runtimeOpts).https.onCall(async (data, context) => {

  if (!context.auth.token.isAdmin) return
  try {
    var _ = await admin.auth().deleteUser(data.uid);
    return db.collection("employeeData").doc(data.uid).delete();
  }
  catch (error) {
    console.log(error)
  }

});
