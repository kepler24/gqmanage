<template>
  <el-dialog
    :visible="visible"
    :title="edit === true?'编辑日志':'写日志'"
    :fullscreen="true"
    :destroy-on-close="true"
    @update:visible="bol=>$emit('update:visible',bol)"
  >
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
      <el-form-item label="笔记标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="笔记内容"  prop="content">
        <quill-editor
          v-model="form.content"
          ref="myQuillEditor"
          :options="editorOption"
          style="height:400px;"
          @focus="onEditorFocus($event)"
          @blur="onEditorBlur($event)"
          @change="onEditorChange($event)"
        ></quill-editor>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer" style="position:fixed;bottom:10px;right:10px">
      <el-button @click="$emit('update:visible',false)">取 消</el-button>
      <el-button v-show="edit===false" type="primary" @click="addDaily">提 交</el-button>
      <el-button v-show="edit===true" type="primary" @click="updateDaily">编 辑</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { addDaily ,addDailyTitle,getOneDaily,updateDaily } from "../api/index";
import { quillEditor } from "vue-quill-editor"; // 调用富文本编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  name: "Dialog",
  components: {
    quillEditor
  },
  props: {
    id:null,
    edit:{
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      editor: null, // 富文本编辑器对象
      content: `<p></p><p><br></p><ol></ol>`, // 富文本编辑器默认内容
      editorOption: {
        //  富文本编辑器配置
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
            ["blockquote", "code-block"], //引用，代码块
            [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
            [{ list: "ordered" }, { list: "bullet" }], //列表
            [{ script: "sub" }, { script: "super" }], // 上下标
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            [{ direction: "rtl" }], // 文本方向
            [{ size: ["small", false, "large", "huge"] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
            [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
            [{ font: [] }], //字体
            [{ align: [] }], //对齐方式
            ["clean"], //清除字体样式
            ["image", "video"] //上传图片、上传视频
          ]
        },
        placeholder: "请输入正文"
      },
      form: {
        title: "",
        content: ""
      },
      rules: {
        title: [{ required: true, message: "请输入笔记标题", trigger: "blur" }],
        content: [
          { required: true, message: "请输入笔记内容", trigger: "blur" }
        ]
      }
    };
  },
  updated() {
    this.editor = this.$refs.myQuillEditor.quill;
  },
  mounted(){
    if(this.id !== null){
      getOneDaily({id:this.id}).then(res => {
        this.form.title = res.data.data.title
        this.form.content = res.data.data.content
      })
    }
  },
  beforeDestroy() {
    this.editor = null;
    this.$emit("update:id", null);
    delete this.editor;
    this.$emit("update:edit", false);
  },
  methods: {
    onEditorFocus($event) {},
    onEditorBlur($event) {},
    onEditorChange($event) {},
    updateDaily(){
      this.$refs["form"].validate(valid => {
        if (valid) {
          updateDaily({ id:this.id,...this.form }).then(res => {
            if (res.data.ok === 1) {
              this.$message({
                message: "编辑成功",
                type: "success"
              });
              this.$emit("update:visible", false);
            }
            this.$parent.getDaily();
          });
        } else {
          return false;
        }
      });
    },
    addDaily() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          addDaily({ ...this.form }).then(res => {
            if (res.data.ok === 1) {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.$emit("update:visible", false);
            }
            this.$parent.getDaily();
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
