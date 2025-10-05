<!-- pages/index.vue -->
<template>
  <div class="min-h-screen bg-gray-900 text-white overflow-hidden relative">
    <!-- Animated Space Background -->
    <div class="fixed inset-0 pointer-events-none">
      <!-- Stars -->
      <div
        v-for="i in 100"
        :key="`star-${i}`"
        class="absolute bg-white rounded-full animate-pulse"
        :style="{
          width: Math.random() * 3 + 'px',
          height: Math.random() * 3 + 'px',
          top: Math.random() * 100 + '%',
          left: Math.random() * 100 + '%',
          animationDelay: Math.random() * 3 + 's',
          animationDuration: Math.random() * 2 + 2 + 's',
        }"
      />
      
      <!-- Animated Planets -->
      <div 
        class="absolute w-96 h-96 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 opacity-20 blur-3xl transition-transform duration-300"
        :style="{
          top: '10%',
          right: '-10%',
          transform: `translateY(${scrollY * 0.3}px)`,
        }"
      />
      <div 
        class="absolute w-64 h-64 rounded-full bg-gradient-to-br from-orange-500 to-red-600 opacity-15 blur-3xl transition-transform duration-300"
        :style="{
          bottom: '20%',
          left: '-5%',
          transform: `translateY(${-scrollY * 0.2}px)`,
        }"
      />
      <div 
        class="absolute w-80 h-80 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 opacity-10 blur-3xl transition-transform duration-300"
        :style="{
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) translateY(${scrollY * 0.15}px)`,
        }"
      />
      
      <!-- Orbiting Elements -->
      <div class="absolute top-1/4 left-1/4 w-32 h-32 animate-spin-slow">
        <div class="absolute top-0 left-1/2 w-4 h-4 bg-yellow-400 rounded-full blur-sm -ml-2" />
      </div>
      <div class="absolute top-2/3 right-1/4 w-40 h-40 animate-spin-slower">
        <div class="absolute top-0 left-1/2 w-3 h-3 bg-pink-400 rounded-full blur-sm -ml-1.5" />
      </div>
    </div>



    <!-- Hero Section -->
    <section id="home" class="relative min-h-screen flex items-center justify-center px-6">
      <div class="container mx-auto text-center relative z-10">
        <div class="inline-block mb-6 animate-bounce">
          <svg class="w-20 h-20 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke-width="2"/>
            <path d="M12 8v4m0 4h.01" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <h1 class="text-6xl md:text-8xl font-bold mb-6 animate-fade-in">
          <span class="bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Impactor-2025
          </span>
        </h1>
        <p class="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Interactive Asteroid Impact Visualization & Simulation Platform
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            @click="launchSimulator"
            class="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:scale-105 transition-transform duration-300 flex items-center gap-2"
          >
            Launch Simulator
            <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M12 19V5m0 0l-7 7m7-7l7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button 
            @click="exploreData"
            class="px-8 py-4 border-2 border-purple-500 rounded-full font-semibold hover:bg-purple-500/20 transition-all duration-300"
          >
            Explore Data
          </button>
        </div>
        <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg class="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>

      <!-- Floating Asteroid -->
      <div 
        class="absolute w-32 h-32 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 shadow-2xl animate-float"
        style="top: 30%; right: 15%; box-shadow: 0 0 60px rgba(139, 92, 246, 0.3);"
      />
    </section>

    <!-- Features Section -->
    <section id="features" class="relative py-20 px-6">
      <div class="container mx-auto">
        <h2 class="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Platform Features
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="(feature, idx) in features"
            :key="idx"
            class="group relative p-8 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-2"
          >
            <div :class="`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`" />
            <div :class="`inline-block p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-4`">
              <component :is="feature.icon" class="w-12 h-12" />
            </div>
            <h3 class="text-2xl font-bold mb-4">{{ feature.title }}</h3>
            <p class="text-gray-400 leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Data Visualization Section -->
    <section id="data" class="relative py-20 px-6 bg-gradient-to-b from-gray-900 via-purple-900/10 to-gray-900">
      <div class="container mx-auto">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              Real-Time Threat Assessment
            </h2>
            <p class="text-xl text-gray-300 mb-8">
              Leveraging NASA's Center for Near-Earth Object Studies (CNEOS) data and USGS impact modeling to provide comprehensive risk analysis
            </p>
            <div class="space-y-4">
              <div
                v-for="(item, idx) in dataPoints"
                :key="idx"
                class="flex items-center gap-3"
              >
                <div class="w-2 h-2 rounded-full bg-green-400" />
                <span class="text-gray-300">{{ item }}</span>
              </div>
            </div>
          </div>
          <div class="relative">
            <div class="aspect-square rounded-2xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-purple-500/30 p-8 flex items-center justify-center">
              <div class="relative w-full h-full">
                <!-- Orbiting elements -->
                <div class="absolute inset-0 border-2 border-purple-500/30 rounded-full animate-spin-slow">
                  <div class="absolute top-0 left-1/2 w-6 h-6 bg-yellow-400 rounded-full -ml-3 -mt-3 shadow-lg shadow-yellow-400/50" />
                </div>
                <div class="absolute inset-8 border-2 border-cyan-500/30 rounded-full animate-spin-reverse">
                  <div class="absolute top-0 left-1/2 w-4 h-4 bg-cyan-400 rounded-full -ml-2 -mt-2 shadow-lg shadow-cyan-400/50" />
                </div>
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full shadow-2xl shadow-blue-500/50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Simulator Preview Section -->
    <section id="simulator" class="relative py-20 px-6">
      <div class="container mx-auto">
        <h2 class="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
          Impact Simulator
        </h2>
        <div class="max-w-4xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-8">
          <div class="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label class="block text-sm font-semibold mb-2 text-purple-400">Asteroid Diameter (m)</label>
              <input 
                v-model="simulatorData.diameter"
                type="range" 
                min="10" 
                max="1000" 
                class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <p class="text-right text-sm mt-1">{{ simulatorData.diameter }}m</p>
            </div>
            <div>
              <label class="block text-sm font-semibold mb-2 text-purple-400">Impact Velocity (km/s)</label>
              <input 
                v-model="simulatorData.velocity"
                type="range" 
                min="10" 
                max="70" 
                class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <p class="text-right text-sm mt-1">{{ simulatorData.velocity }} km/s</p>
            </div>
            <div>
              <label class="block text-sm font-semibold mb-2 text-purple-400">Impact Angle (degrees)</label>
              <input 
                v-model="simulatorData.angle"
                type="range" 
                min="15" 
                max="90" 
                class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <p class="text-right text-sm mt-1">{{ simulatorData.angle }}°</p>
            </div>
            <div>
              <label class="block text-sm font-semibold mb-2 text-purple-400">Target Type</label>
              <select 
                v-model="simulatorData.target"
                class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
              >
                <option value="sedimentary">Sedimentary Rock</option>
                <option value="crystalline">Crystalline Rock</option>
                <option value="water">Water/Ocean</option>
              </select>
            </div>
          </div>
          <div class="bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-xl p-6 border border-orange-500/30">
            <h3 class="text-2xl font-bold mb-4 text-orange-400">Estimated Impact Effects</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-400">Energy Released</p>
                <p class="text-xl font-bold text-white">{{ calculatedEnergy }} Megatons</p>
              </div>
              <div>
                <p class="text-sm text-gray-400">Crater Diameter</p>
                <p class="text-xl font-bold text-white">{{ calculatedCrater }} km</p>
              </div>
              <div>
                <p class="text-sm text-gray-400">Seismic Magnitude</p>
                <p class="text-xl font-bold text-white">{{ calculatedSeismic }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-400">Fireball Radius</p>
                <p class="text-xl font-bold text-white">{{ calculatedFireball }} km</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mitigation Section -->
    <section id="mitigation" class="relative py-20 px-6 bg-gradient-to-b from-gray-900 via-blue-900/10 to-gray-900">
      <div class="container mx-auto">
        <h2 class="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Mitigation Strategies
        </h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(strategy, idx) in mitigationStrategies"
            :key="idx"
            class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-blue-500/20 p-6 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1"
          >
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center mb-4">
              <span class="text-2xl">{{ strategy.emoji }}</span>
            </div>
            <h3 class="text-xl font-bold mb-2">{{ strategy.title }}</h3>
            <p class="text-gray-400 text-sm">{{ strategy.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="relative py-20 px-6">
      <div class="container mx-auto text-center">
        <h2 class="text-5xl font-bold mb-6 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          Ready to Explore?
        </h2>
        <p class="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Join scientists, educators, and decision-makers in understanding and preparing for near-Earth object threats
        </p>
        <button 
          @click="startMission"
          class="group px-12 py-5 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/50 flex items-center gap-3 mx-auto"
        >
          Start Your Mission
          <svg class="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M13 7l5 5m0 0l-5 5m5-5H6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </section>

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
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Meta tags for SEO
useHead({
  title: 'Meteor Madness - Asteroid Impact Simulator',
  meta: [
    { name: 'description', content: 'Interactive Asteroid Impact Visualization & Simulation Platform using NASA and USGS data' }
  ]
})

// Reactive data
const scrollY = ref(0)
const navItems = ['Home', 'Features', 'Simulator', 'Mitigation']

const simulatorData = ref({
  diameter: 100,
  velocity: 20,
  angle: 45,
  target: 'sedimentary'
})

const features = [
  {
    title: "NASA Data Integration",
    description: "Real-time access to NASA's Near-Earth Object database with comprehensive asteroid tracking and orbital data",
    color: "from-blue-500 to-cyan-400",
    icon: 'database'
  },
  {
    title: "Impact Simulation",
    description: "Advanced modeling using USGS geological data to predict crater formation, seismic effects, and environmental impact",
    color: "from-purple-500 to-pink-500",
    icon: 'globe'
  },
  {
    title: "Mitigation Strategies",
    description: "Evaluate deflection techniques, evacuation planning, and emergency response scenarios for potential impacts",
    color: "from-orange-500 to-red-500",
    icon: 'shield'
  }
]

const dataPoints = [
  "15,000+ tracked near-Earth asteroids",
  "Real-time orbital trajectory updates",
  "Impact probability calculations",
  "Energy yield estimations"
]

const mitigationStrategies = [
  {
    emoji: "🚀",
    title: "Kinetic Impactor",
    description: "High-speed spacecraft collision to alter asteroid trajectory"
  },
  {
    emoji: "💡",
    title: "Gravity Tractor",
    description: "Spacecraft uses gravitational pull to slowly deflect asteroid"
  },
  {
    emoji: "☀️",
    title: "Solar Sail",
    description: "Reflective material to use solar radiation pressure for deflection"
  },
  {
    emoji: "💥",
    title: "Nuclear Option",
    description: "Last resort: nuclear detonation to fragment or deflect"
  }
]

// Computed properties
const calculatedEnergy = computed(() => {
  const energy = 0.5 * Math.pow(simulatorData.value.diameter / 100, 3) * Math.pow(simulatorData.value.velocity, 2) / 4.184
  return energy.toFixed(2)
})

const calculatedCrater = computed(() => {
  const crater = simulatorData.value.diameter * 0.15 * Math.pow(Math.sin(simulatorData.value.angle * Math.PI / 180), 0.5)
  return crater.toFixed(2)
})

const calculatedSeismic = computed(() => {
  const magnitude = 0.67 * Math.log10(parseFloat(calculatedEnergy.value)) + 3.87
  return magnitude.toFixed(1)
})

const calculatedFireball = computed(() => {
  const fireball = Math.pow(parseFloat(calculatedEnergy.value), 0.4) * 2.5
  return fireball.toFixed(2)
})

// Methods
const handleScroll = () => {
  scrollY.value = window.scrollY
}

const launchSimulator = () => {
  document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth' })
}

const exploreData = () => {
  document.getElementById('data')?.scrollIntoView({ behavior: 'smooth' })
}

const startMission = () => {
  alert('Mission started! Explore the simulator above.')
  launchSimulator()
}

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin 20s linear infinite;
}

.animate-spin-slower {
  animation: spin 30s linear infinite;
}

.animate-spin-reverse {
  animation: spin 15s linear infinite reverse;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #1a1a2e;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #a855f7, #ec4899);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #9333ea, #db2777);
}
</style>