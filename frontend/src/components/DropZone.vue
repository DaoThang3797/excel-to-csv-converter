<template>
  <div 
    class="drop-zone" 
    data-test="dropzone"
    @dragover.prevent="handleDragOver" 
    @dragleave.prevent="handleDragLeave" 
    @drop.prevent="handleDrop"
    @click="$refs.fileInput.click()"
    :class="{ 'drop-active': isActive }"
  >
    <div class="drop-zone-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <path d="M8 13h2v5h4v-5h2l-4-4-4 4z"></path>
      </svg>
    </div>
    <h3 class="drop-zone-title">Kéo thả file Excel vào đây</h3>
    <p class="drop-zone-or">hoặc</p>
    <button class="btn btn-primary">
      <span class="btn-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
      </span>
      Chọn File
    </button>
    <input 
      type="file" 
      ref="fileInput" 
      accept=".xlsx,.xls" 
      @change="handleFileChange"
    />
    <p class="drop-zone-info">Hỗ trợ file .xlsx và .xls</p>
  </div>
</template>

<script>
export default {
  name: 'DropZone',
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    handleDragOver() {
      this.isActive = true
    },
    handleDragLeave() {
      this.isActive = false
    },
    handleDrop(e) {
      this.isActive = false
      const files = e.dataTransfer.files
      if (files.length) {
        this.validateAndEmitFile(files[0])
      }
    },
    handleFileChange(e) {
      const files = e.target.files
      if (files.length) {
        this.validateAndEmitFile(files[0])
      }
    },
    validateAndEmitFile(file) {
      // Kiểm tra phần mở rộng của file
      const validExtensions = ['xlsx', 'xls']
      const fileExtension = file.name.split('.').pop().toLowerCase()
      
      if (!validExtensions.includes(fileExtension)) {
        this.$emit('error', 'Vui lòng chọn file Excel có định dạng .xlsx hoặc .xls')
        return
      }
      
      // Phát ra sự kiện với file đã chọn
      this.$emit('file-selected', file)
      
      // Reset input để có thể chọn lại cùng một file
      this.$refs.fileInput.value = ''
    }
  }
}
</script>

<style scoped>
.drop-active {
  border-color: #3B82F6;
  background-color: rgba(219, 234, 254, 0.3);
}
</style> 