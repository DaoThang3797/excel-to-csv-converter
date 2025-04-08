<template>
  <div class="progress-container">
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: `${percentage}%` }"></div>
    </div>
    <div class="progress-info">
      <div class="progress-status">{{ status }}</div>
      <div class="progress-percentage">{{ percentage }}%</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    percentage: {
      type: Number,
      required: true,
      validator: value => value >= 0 && value <= 100
    },
    status: {
      type: String,
      default: 'Đang chuyển đổi...'
    }
  }
}
</script> 