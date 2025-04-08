<template>
  <div class="container">
    <div class="card">
      <!-- Phần header -->
      <div class="card-header">
        <h1 class="card-title">Excel to CSV Converter</h1>
        <p class="card-subtitle">Chuyển đổi file Excel sang định dạng CSV trong vài giây</p>
      </div>
      
      <!-- Khu vực kéo thả file -->
      <DropZone 
        v-if="!selectedFile" 
        @file-selected="handleFileSelected" 
        @error="showError"
      />
      
      <!-- Hiển thị file đã chọn -->
      <FileItem 
        v-if="selectedFile" 
        :file="selectedFile" 
        @remove="removeFile"
      />
      
      <!-- Thanh tiến trình -->
      <ProgressBar 
        v-if="converting" 
        :percentage="conversionProgress" 
        status="Đang chuyển đổi..."
      />
      
      <!-- Các nút thao tác -->
      <div class="actions" v-if="selectedFile">
        <button 
          class="btn btn-primary btn-block" 
          @click="convertFile" 
          :disabled="converting || converted"
        >
          <span class="btn-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="16 3 21 3 21 8"></polyline>
              <line x1="4" y1="20" x2="21" y2="3"></line>
              <path d="M21 16v5h-5"></path>
              <line x1="15" y1="15" x2="21" y2="21"></line>
              <line x1="4" y1="4" x2="9" y2="9"></line>
            </svg>
          </span>
          Chuyển đổi
        </button>
        <button 
          class="btn btn-success btn-block" 
          @click="downloadCsv" 
          :disabled="!converted"
        >
          <span class="btn-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </span>
          Tải CSV
        </button>
      </div>
      
      <!-- Thông báo -->
      <Alert 
        v-if="notification.show" 
        :type="notification.type" 
        :message="notification.message" 
      />
    </div>
  </div>
</template>

<script>
import DropZone from '../components/DropZone.vue'
import FileItem from '../components/FileItem.vue'
import ProgressBar from '../components/ProgressBar.vue'
import Alert from '../components/Alert.vue'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

export default {
  name: 'HomeView',
  components: {
    DropZone,
    FileItem,
    ProgressBar,
    Alert
  },
  data() {
    return {
      selectedFile: null,
      csvContent: null,
      converting: false,
      converted: false,
      conversionProgress: 0,
      notification: {
        show: false,
        type: 'success',
        message: ''
      }
    }
  },
  methods: {
    handleFileSelected(file) {
      this.selectedFile = file
      this.csvContent = null
      this.converted = false
      this.notification.show = false
    },
    
    removeFile() {
      this.selectedFile = null
      this.csvContent = null
      this.converted = false
      this.notification.show = false
    },
    
    showSuccess(message) {
      this.notification = {
        show: true,
        type: 'success',
        message
      }
    },
    
    showError(message) {
      this.notification = {
        show: true,
        type: 'error',
        message
      }
    },
    
    convertFile() {
      if (!this.selectedFile) return
      
      this.converting = true
      this.conversionProgress = 0
      
      // Mô phỏng tiến trình chuyển đổi
      const simulateProgress = () => {
        const interval = setInterval(() => {
          this.conversionProgress += 5
          if (this.conversionProgress >= 100) {
            clearInterval(interval)
            this.finishConversion()
          }
        }, 100)
      }
      
      // Thực hiện chuyển đổi
      const reader = new FileReader()
      
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result)
          const workbook = XLSX.read(data, { type: 'array' })
          
          // Lấy sheet đầu tiên
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
          
          // Chuyển đổi sang CSV
          this.csvContent = XLSX.utils.sheet_to_csv(firstSheet)
          
          // Bắt đầu mô phỏng tiến trình
          simulateProgress()
        } catch (error) {
          this.converting = false
          this.showError('Đã xảy ra lỗi khi xử lý file. Vui lòng kiểm tra định dạng file.')
          console.error(error)
        }
      }
      
      reader.onerror = () => {
        this.converting = false
        this.showError('Đã xảy ra lỗi khi đọc file. Vui lòng thử lại.')
      }
      
      reader.readAsArrayBuffer(this.selectedFile)
    },
    
    finishConversion() {
      this.converting = false
      this.converted = true
      this.showSuccess('Chuyển đổi hoàn tất thành công!')
    },
    
    downloadCsv() {
      if (!this.csvContent) return
      
      // Tạo blob từ nội dung CSV
      const blob = new Blob([this.csvContent], { type: 'text/csv;charset=utf-8' })
      
      // Tạo tên file từ tên file gốc
      const fileName = this.selectedFile.name.replace(/\.[^/.]+$/, '') + '.csv'
      
      // Tải file
      saveAs(blob, fileName)
    }
  }
}
</script> 