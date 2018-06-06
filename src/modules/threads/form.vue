<template>
  <div class="page-threads-show" v-if="ready">
    <div class="row">
      <div class="col-md-9 m-auto">
        <div class="box box-flush">
          <form>
            <div class="box-heading box-body border-bottom mb-0">
              <div class="input-group input-group-lg">
                <input type="text" class="form-control border-0 px-0 text-24" v-model="form.title" placeholder="请在这里输入标题">
              </div>
            </div>
            <editor v-model="form.content.markdown"></editor>
            <div class="box-footer border-top p-2 d-flex justify-content-between">
              <div class="left-actions d-flex align-items-center">
                <span class="text-muted">发布到</span>
                <div class="dropdown ml-1">
                  <el-select filterable v-model="form.node_id">
                    <el-option v-for="item in nodes" :key="item.id" :value="item.id" :label="item.title"></el-option>
                  </el-select>
                </div>
              </div>
              <div class="right-actions">
                <button type="button" class="btn btn-primary" :disabled="!formReady" @click="submit(false)">立即发布</button>
                <button type="button" class="btn btn-secondary ml-1" :disabled="!formReady" @click="submit(true)">保存为草稿</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Editor from "@components/editor"
  import localforage from "localforage"
  import { Select as ElSelect, Option as ElOption } from "element-ui"
  import 'element-ui/lib/theme-chalk/select.css'

  export default {
    name: 'thread-form',
    components: {
      Editor,
      ElSelect,
      ElOption,
    },
    data() {
      return {
        ready: false,
        nodes: [],
        busing: false,
        form: {
          node_id: null,
          type: 'markdown',
          is_draft: true,
          title: '',
          content: {
            markdown: '',
            body: '',
          }
        }
      }
    },
    watch: {
      form: {
        deep: true,
        handler() {
          localforage.setItem('thread.form', this.form)
        }
      }
    },
    computed: {
      formReady() {
        return !this.busing
          && this.form.title.length > 5
          && this.form.node_id > 0
          && this.form.content.markdown && this.form.content.markdown.length > 30
      }
    },
    mounted() {
      this.loadNodes()
      if (this.$route.name == 'threads.edit') {
        this.loadThread(this.$route.params.id).then(this.syncFromCache).then(() => {
          this.ready = true
        })
      } else {
        this.syncFromCache()
        this.ready = true
      }
    },
    methods: {
      syncFromCache() {
        localforage.getItem('thread.form', (err, form) => {
          if (!err && typeof form == 'object') {
            this.form = Object.assign(this.form, form)
          }
        })
      },
      clearCache() {
        localforage.removeItem('thread.form')
      },
      loadNodes() {
        this.busing = true
        return this.api('nodes').get().then((response) => {
          this.nodes = response.data
          this.busing = false
        }).finally(() => this.busing = false)
      },
      loadThread(id) {
        return this.api('threads').find(id).then(thread => this.form = Object.assign(this.form, thread))
      },
      submit(draft = true) {
        this.form.is_draft = draft
        this.busing = true
        let promise = null
        let isEdit = this.$route.name == 'threads.edit'

        if (isEdit) {
          promise = this.api('threads', this.$route.params.id).patch(this.form)
        } else {
          promise = this.api('threads').post(this.form)
        }

        promise.then((response) => {
          this.$message.success('内容已' + (draft ? '保存为草稿' : isEdit ? '更新' : '发布'))
          this.$router.replace({name: 'threads.show', params: {id: response.id}})
          this.clearCache()
        }).finally(() => this.busing = false)
      }
    }
  }
</script>

<style lang="scss">
  .form-control:focus {
    border: none;
    box-shadow: none;
  }

  .editor-container {
    overflow: auto;
    height: calc(100vh - 370px);
  }
</style>