<script setup lang="ts">
import { AcademicCapIcon, BookOpenIcon, DevicePhoneMobileIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-primary/5 to-base-100">
    <div class="container mx-auto px-4 min-h-screen flex flex-col">
      <main class="flex-1 flex flex-col items-center justify-center text-center py-16">
        <h1 class="text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
          LibEdu
        </h1>
        <p class="text-2xl text-base-content/80 max-w-2xl mx-auto mb-8">
          La plateforme moderne qui connecte professeurs et étudiants, rendant l'apprentissage accessible partout.
        </p>
        <div class="flex gap-4 mb-16">
          <button class="btn btn-primary btn-lg">Se connecter</button>
          <button class="btn btn-ghost btn-lg">En savoir plus</button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mx-auto">
          <div class="group hover:bg-base-200 rounded-xl p-6 transition-all duration-300">
            <div class="flex flex-col items-center">
              <AcademicCapIcon class="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 class="text-xl font-semibold mb-2">Pour les Professeurs</h3>
              <p class="text-base-content/70 text-center">Partagez et gérez vos cours en toute simplicité</p>
            </div>
          </div>

          <div class="group hover:bg-base-200 rounded-xl p-6 transition-all duration-300">
            <div class="flex flex-col items-center">
              <BookOpenIcon class="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 class="text-xl font-semibold mb-2">Contenu Accessible</h3>
              <p class="text-base-content/70 text-center">Une bibliothèque de cours centralisée et organisée</p>
            </div>
          </div>

          <div class="group hover:bg-base-200 rounded-xl p-6 transition-all duration-300">
            <div class="flex flex-col items-center">
              <DevicePhoneMobileIcon class="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 class="text-xl font-semibold mb-2">Mobilité Totale</h3>
              <p class="text-base-content/70 text-center">Apprenez où vous voulez, quand vous voulez</p>
            </div>
          </div>
        </div>
      </main>

      <footer class="py-4 text-center text-base-content/60">
        <p>© 2025 LibEdu - Conçu avec passion pour l'éducation</p>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.bg-gradient-to-r {
  -webkit-background-clip: text;
  background-clip: text;
}
</style>

