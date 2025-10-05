<template>
  <div class="relative min-h-screen bg-gradient-to-b from-[#020215] via-[#041029] to-[#00040a] text-white overflow-hidden">
    <!-- Background space animation -->
    <canvas ref="starCanvas" class="absolute inset-0 w-full h-full z-0"></canvas>
    <div class="absolute z-0 inset-0 pointer-events-none">
      <div class="orbit orbit-1"></div>
      <div class="orbit orbit-2"></div>
      <div class="planet planet-1"></div>
      <div class="planet planet-2"></div>
    </div>

    <!-- Header -->
    <header class="relative z-20 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
      <h1 class="text-2xl font-extrabold tracking-tight">
        Meteor <span class="text-amber-300">Madness</span> Dashboard
      </h1>
      <div class="flex items-center gap-3">
        <button @click="reloadData" class="px-3 py-2 bg-gradient-to-r from-amber-400 to-rose-400 text-black rounded-lg shadow-md hover:scale-105 transition">Reload Data</button>
      </div>
    </header>

    <!-- Controls -->
    <main class="relative z-20 max-w-7xl mx-auto px-6 pb-16 space-y-6">
      <div class="flex flex-wrap gap-3 items-center">
        <input v-model="search" placeholder="🔍 Search by name..." class="flex-1 px-4 py-2 rounded-full bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400" />
        <select v-model="filterHazard" class="px-3 py-2 rounded bg-white/5 border border-white/10">
          <option value="all">All</option>
          <option value="hazard">Hazardous</option>
          <option value="safe">Non-hazardous</option>
        </select>
        <div class="flex gap-2 items-center text-sm">
          <input type="range" v-model.number="sizeRange" min="0" max="2000" step="50" class="w-48 accent-amber-400" />
          <span>Max Dia: {{ sizeRange }} m</span>
        </div>
      </div>

      <!-- Stat Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Total Asteroids" :value="animated.total" color="text-amber-300" />
        <StatCard label="Hazardous" :value="animated.hazard" color="text-rose-400" />
        <StatCard label="Avg Velocity (km/s)" :value="animated.avgVelocity" color="text-cyan-400" />
      </div>

      <!-- Charts -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="p-4 rounded-2xl bg-white/5 border border-white/10">
          <h3 class="mb-2 font-semibold text-lg">Velocity Distribution</h3>
          <canvas ref="velChart" class="w-full h-48"></canvas>
        </div>
        <div class="p-4 rounded-2xl bg-white/5 border border-white/10">
          <h3 class="mb-2 font-semibold text-lg">Diameter vs Miss Distance</h3>
          <canvas ref="scatterChart" class="w-full h-48"></canvas>
        </div>
      </div>

      <!-- Table -->
      <div class="p-4 rounded-2xl bg-white/5 border border-white/10">
        <h3 class="text-lg font-semibold mb-3">Asteroid Data</h3>
        <div class="overflow-auto max-h-[60vh]">
          <table class="w-full text-sm">
            <thead class="bg-white/10 sticky top-0 backdrop-blur">
              <tr>
                <th class="px-4 py-2 text-left">Name</th>
                <th class="px-4 py-2">Diameter (m)</th>
                <th class="px-4 py-2">Velocity (km/s)</th>
                <th class="px-4 py-2">Miss Distance (km)</th>
                <th class="px-4 py-2">Hazardous</th>
                <th class="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(r, i) in filtered" :key="i" class="hover:bg-white/10 transition">
                <td class="px-4 py-2 font-semibold">{{ r.name }}</td>
                <td class="text-center">{{ r.diameter_m }}</td>
                <td class="text-center">{{ r.velocity_km_s }}</td>
                <td class="text-center">{{ r.miss_distance_km }}</td>
                <td class="text-center">
                  <span :class="r.hazardous === '1' ? 'text-rose-400' : 'text-emerald-400'">
                    {{ r.hazardous === '1' ? 'Yes' : 'No' }}
                  </span>
                </td>
                <td class="text-center">
                  <button @click="openModal(r)" class="px-3 py-1 bg-amber-400/80 text-black rounded hover:scale-105 transition">Details</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <!-- Modal -->
    <transition name="fade">
      <div v-if="showModal" class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
        <div class="bg-[#0b1120] text-white rounded-2xl w-96 p-6 relative border border-white/10 shadow-xl">
          <button @click="showModal = false" class="absolute top-3 right-3 text-gray-400 hover:text-white">✖</button>
          <h3 class="text-lg font-bold mb-3">{{ selected?.name }}</h3>
          <p><b>Diameter:</b> {{ selected?.diameter_m }} m</p>
          <p><b>Velocity:</b> {{ selected?.velocity_km_s }} km/s</p>
          <p><b>Miss Distance:</b> {{ selected?.miss_distance_km }} km</p>
          <p><b>Hazardous:</b> {{ selected?.hazardous === '1' ? 'Yes' : 'No' }}</p>
          <hr class="my-3 border-white/10">
          <div>
            <p><b>Impact Energy:</b> {{ estimateEnergyMt(selected).toFixed(2) }} Mt TNT</p>
            <p><b>Crater Diameter:</b> {{ estimateCraterKm(selected).toFixed(2) }} km</p>
          </div>
          <button @click="simulateImpact" class="mt-4 w-full py-2 bg-gradient-to-r from-rose-500 to-amber-400 text-black rounded-lg font-semibold shadow-lg hover:scale-105 transition">
            Simulate Impact 💥
          </button>
        </div>
      </div>
    </transition>

    <!-- Impact Animation -->
    <div v-if="impactAnim.show" class="impact-overlay" @animationend="impactAnim.show = false">
      <div class="impact-ring" :style="{ left: impactAnim.x + 'px', top: impactAnim.y + 'px' }"></div>
      <div class="impact-flare" :style="{ left: impactAnim.x + 'px', top: impactAnim.y + 'px' }"></div>
    </div>

        <!-- Footer -->
    <footer class="relative border-t border-purple-500/20 py-8 px-6 backdrop-blur-sm">
      <div class="container mx-auto text-center text-gray-400">
        <p>© 2025 NEO Sentinel | NASA Space Apps Challenge</p>
        <p class="text-sm mt-2">Data sources: NASA CNEOS, JPL, USGS</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import Papa from 'papaparse'
import Chart from 'chart.js/auto'

// reactive states
const rows = ref([])
const search = ref('')
const filterHazard = ref('all')
const sizeRange = ref(2000)
const selected = ref(null)
const showModal = ref(false)
const impactAnim = reactive({ show: false, x: 0, y: 0 })
const animated = reactive({ total: 0, hazard: 0, avgVelocity: 0 })

const velChart = ref(null)
const scatterChart = ref(null)

// Load CSV
async function loadCsv() {
  const res = await fetch('/neo_feed.csv')
  const text = await res.text()
  const parsed = Papa.parse(text, { header: true, skipEmptyLines: true })
  rows.value = parsed.data.map(r => ({
    name: r.name,
    diameter_m: Number(r.diameter_m || 0),
    velocity_km_s: Number(r.velocity_km_s || 0),
    miss_distance_km: Number(r.miss_distance_km || 0),
    hazardous: String(r.hazardous || '0')
  }))
  animateSummary()
  drawCharts()
}

function reloadData() { loadCsv() }

// Filters
const filtered = computed(() =>
  rows.value.filter(r => {
    if (filterHazard.value === 'hazard' && r.hazardous !== '1') return false
    if (filterHazard.value === 'safe' && r.hazardous === '1') return false
    if (r.diameter_m > sizeRange.value) return false
    if (search.value && !r.name.toLowerCase().includes(search.value.toLowerCase())) return false
    return true
  })
)

// Modal
function openModal(r) {
  selected.value = r
  showModal.value = true
}

// Impact Simulation
function simulateImpact() {
  impactAnim.x = window.innerWidth / 2
  impactAnim.y = window.innerHeight / 2
  impactAnim.show = false
  void document.body.offsetHeight
  impactAnim.show = true
  showModal.value = false
}

// Estimations
function estimateMass(r) {
  const d = r?.diameter_m || 0
  const r_m = d / 2
  return 3000 * ((4 / 3) * Math.PI * Math.pow(r_m, 3))
}
function estimateEnergyMt(r) {
  const m = estimateMass(r)
  const v = (r?.velocity_km_s || 0) * 1000
  return (0.5 * m * v * v) / 4.184e15
}
function estimateCraterKm(r) {
  return Math.pow(estimateEnergyMt(r), 1 / 3) * 1.2
}

// Animated summary
function animateSummary() {
  const total = rows.value.length
  const hazard = rows.value.filter(r => r.hazardous === '1').length
  const avgVel = rows.value.reduce((a, b) => a + b.velocity_km_s, 0) / total
  let step = 0
  const interval = setInterval(() => {
    step++
    const p = step / 30
    animated.total = Math.round(total * p)
    animated.hazard = Math.round(hazard * p)
    animated.avgVelocity = (avgVel * p).toFixed(2)
    if (step >= 30) clearInterval(interval)
  }, 20)
}

// Charts
let velChartInstance = null
let scatterChartInstance = null
function drawCharts() {
  if (velChartInstance) velChartInstance.destroy()
  const velocities = rows.value.map(r => r.velocity_km_s)
  velChartInstance = new Chart(velChart.value.getContext('2d'), {
    type: 'bar',
    data: {
      labels: velocities.map((_, i) => `#${i + 1}`),
      datasets: [{ data: velocities, backgroundColor: 'rgba(255,193,7,0.6)' }]
    },
    options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
  })

  if (scatterChartInstance) scatterChartInstance.destroy()
  const scatterData = rows.value.map(r => ({ x: r.miss_distance_km / 1e6, y: r.diameter_m }))
  scatterChartInstance = new Chart(scatterChart.value.getContext('2d'), {
    type: 'scatter',
    data: { datasets: [{ data: scatterData, pointBackgroundColor: 'rgba(75,192,192,0.8)' }] },
    options: { plugins: { legend: { display: false } } }
  })
}

// Star background
function setupStarfield() {
  const canvas = document.querySelector('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = innerWidth
  canvas.height = innerHeight
  const stars = Array.from({ length: 150 }, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    r: Math.random() * 2,
    s: Math.random() * 0.6
  }))
  function animate() {
    ctx.fillStyle = 'rgba(0,0,20,0.3)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    stars.forEach(s => {
      ctx.beginPath()
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
      ctx.fillStyle = 'white'
      ctx.fill()
      s.y += s.s
      if (s.y > canvas.height) s.y = 0
    })
    requestAnimationFrame(animate)
  }
  animate()
}

onMounted(() => {
  loadCsv()
  setupStarfield()
})
</script>

<style scoped>
.orbit {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.05);
}
.orbit-1 { width: 600px; height: 600px; left: 15%; top: 15%; animation: spin 90s linear infinite; }
.orbit-2 { width: 400px; height: 400px; right: 15%; bottom: 10%; animation: spin 120s linear infinite reverse; }
.planet {
  position: absolute;
  border-radius: 50%;
  animation: float 8s ease-in-out infinite;
}
.planet-1 { width: 60px; height: 60px; background: radial-gradient(circle, #89b4ff, #1e3b7a); left: 10%; top: 10%; }
.planet-2 { width: 50px; height: 50px; background: radial-gradient(circle, #ffb385, #6b2b0f); right: 12%; bottom: 15%; }

@keyframes spin { 100% { transform: rotate(360deg); } }
@keyframes float { 50% { transform: translateY(-10px); } }

.impact-overlay { position: fixed; inset: 0; z-index: 50; pointer-events: none; }
.impact-ring {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid #ffa726;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: ring 1.2s ease-out forwards;
}
.impact-flare {
  position: absolute;
  width: 10px;
  height: 10px;
  background: radial-gradient(circle, #fff7c0, rgba(255,120,0,0.4));
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: flare 1s ease-out forwards;
}
@keyframes ring {
  0% { opacity: 1; transform: translate(-50%, -50%) scale(0.1); }
  100% { opacity: 0; transform: translate(-50%, -50%) scale(10); }
}
@keyframes flare {
  0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  100% { opacity: 0; transform: translate(-50%, -50%) scale(10); }
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>

<!-- StatCard component -->
<script>
export default {
  props: ['label', 'value', 'color'],
  template: `
    <div class="p-4 rounded-2xl bg-white/5 border border-white/10 text-center hover:scale-105 transition shadow">
      <div class="text-xs opacity-70">{{ label }}</div>
      <div :class="'text-3xl font-bold mt-1 ' + color">{{ value }}</div>
    </div>
  `
}
</script>
