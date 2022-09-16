<template>
  <div>
    <div class="container jumbotron bg-light shadow" >
      <h4 class="text-center text-success mb-4 p-2">ผลประเมินการเรียน</h4>
      <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-8">
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th class="text-center">หัวข้อที่ประเมิน</th>
                  <th>ผลประเมิน</th>
                </tr>
              </thead>
              <tbody class="text-success">
                <tr>
                  <td>ความสนใจ การตั้งใจเรียน และการมีสมาธิ</td>
                  <td>{{ respond.Quality.interesting }}</td>
                </tr>
                <tr>
                  <td>การเรียนรู้เรื่องจังหวะ ตัวโน๊ต</td>
                  <td>{{ respond.Quality.rhythm }}</td>
                </tr>
                <tr>
                  <td>
                    การนั่ง การวางมือ และการปฎิบัติกับเครื่องดนตรี
                    ด้วยท่าทางที่ถูกต้อง
                  </td>
                  <td>{{ respond.Quality.position }}</td>
                </tr>
                <tr>
                  <td>การอ่านโน๊ต</td>
                  <td>{{ respond.Quality.noteReading }}</td>
                </tr>
                <tr>
                  <td>การทบทวนบทเรียน หรือแบบทดสอบ</td>
                  <td>{{ respond.Quality.exam }}</td>
                </tr>
                <tr>
                  <td>ความจำ และความแม่นยำ</td>
                  <td>{{ respond.Quality.accurate }}</td>
                </tr>
                <tr>
                  <td>ทักษะการฟัง และการอ่าน ประสาทสัมผัส</td>
                  <td>{{ respond.Quality.ear }}</td>
                </tr>
                <tr>
                  <td>ความคิดสร้างสรรค์ จินตนาการ</td>
                  <td>{{ respond.Quality.imagin }}</td>
                </tr>
                <tr>
                  <td>ทักษะการไล่สเกล</td>
                  <td>{{ respond.Quality.scale }}</td>
                </tr>
                <tr>
                  <td>ทฤษฎีดนตรี เรียบเรียง เสียงประสาน</td>
                  <td>{{ respond.Quality.theory }}</td>
                </tr>
              </tbody>
            </table>
            <!-- <hr class="text-success" /> -->
          </div>
          <div class="form-group">
            <label for="comment" class="text-success">ความคิดเห็นครู</label>
            <textarea
              :value="respond.teacherComment"
              disabled
              class="form-control"
              rows="5"
              id="comment"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="comment" class="text-success"
              >ความคิดเห็นผู้ปกครอง</label
            >
            <textarea
              :value="respond.parentComment"
              disabled
              class="form-control"
              rows="5"
              id="comment"
            ></textarea>
          </div>
        </div>
        <div class="col-md-2"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../../firebase.js";

export default {
  name: "SchoolTestAsssessResult1",

  data() {
    return {
      respond: {
        Quality: {
          interesting: "",
          rhythm: "",
          position: "",
          noteReading: "",
          exam: "",
          accurate: "",
          ear: "",
          imagin: "",
          scale: "",
          theory: "",
        },
        teacherComment: "",
        parentComment: "",
      },
    };
  },

  methods: {
    getResult() {
      let docRef = db.collection("assessment").doc(this.$route.params.uid);
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            this.respond = doc.data();
            console.log("Document data:", this.respond);
          } else {
            // doc.data() will be undefined in this case
            (this.respond = {
              Quality: {
                interesting: "",
                rhythm: "",
                position: "",
                noteReading: "",
                exam: "",
                accurate: "",
                ear: "",
                imagin: "",
                scale: "",
                theory: "",
              },
              teacherComment: "",
              parentComment: "",
            }),
              console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    },
  },
  created() {
    this.getResult();
  },
};
</script>

<style lang="scss" scoped></style>
