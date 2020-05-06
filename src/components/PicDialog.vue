<template>
  <el-dialog
    :visible="visible"
    :title="edit === true?'编辑图片':'发图片'"
    :fullscreen="true"
    :destroy-on-close="true"
    @update:visible="bol=>$emit('update:visible',bol)"
  >
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
      <el-form-item label="图片标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="拍摄地点" prop="place">
        <el-input v-model="form.place"></el-input>
      </el-form-item>
      <el-form-item label="上传途径" prop="uploadType">
        <el-select v-model="value" placeholder="请选择上传途径">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上传图片" v-if="value === '1'" prop="uploadImg">
        <el-upload
          class="upload-demo"
          action="/gao/upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :file-list="fileList"
          list-type="picture"
          :limit=1
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">~~~</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="图片链接" prop="picurl" v-if="value === '2'">
        <el-input v-model="form.picurl"></el-input>
      </el-form-item>
      <el-form-item v-if="value === '2'" label="图片">
        <img style="width:200px" :src="form.picurl" alt />
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer" style="position:fixed;bottom:10px;right:10px">
      <el-button @click="$emit('update:visible',false)">取 消</el-button>
      <el-button v-show="edit===false" type="primary" @click="addPic">提 交</el-button>
      <el-button v-show="edit===true" type="primary" @click="updatePic">编 辑</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { addPic, getOnePic, updatePic,upload } from "../api/index";
export default {
  name: "Dialog",
  props: {
    id: null,
    edit: {
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
      fileList: [],
      form: {
        title: "",
        place: "",
        picurl: "",
        
      },
      options: [
        {
          value: "1",
          label: "本地上传"
        },
        {
          value: "2",
          label: "加入链接"
        }
      ],
      value: "1",
      rules: {
        title: [{ required: true, message: "请输入图片标题", trigger: "blur" }],
        place: [{ required: true, message: "请输入拍摄地点", trigger: "blur" }],
        picurl: [{ required: true, message: "请输入图片链接", trigger: "blur" }]
      }
    };
  },
  updated() {},
  mounted() {
    if (this.id !== null) {
      getOnePic({ id: this.id }).then(res => {
        this.form.title = res.data.data.title;
        this.form.place = res.data.data.place;
        this.form.picurl = res.data.data.picurl;
      });
    }
  },
  beforeDestroy() {
    this.$emit("update:id", null);
    this.$emit("update:edit", false);
  },
  methods: {
    handleSuccess(res, file, fileList){
      this.form.picurl = res.imgPath
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    updatePic() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          updatePic({ id: this.id, ...this.form }).then(res => {
            if (res.data.ok === 1) {
              this.$message({
                message: "编辑成功",
                type: "success"
              });
              this.$emit("update:visible", false);
            }
            this.$parent.getPic();
          });
        } else {
          return false;
        }
      });
    },
    addPic() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          addPic({ ...this.form}).then(res => {
            if (res.data.ok === 1) {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.$emit("update:visible", false);
            }
            this.$parent.getPic();
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
