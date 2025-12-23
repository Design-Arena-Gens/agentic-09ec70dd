'use client'

import { useState, useEffect } from 'react'
import { 
  Target, 
  TrendingUp, 
  Layers, 
  Zap, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  Gift,
  Sparkles,
  ArrowRight,
  BarChart3,
  Users,
  DollarSign,
  Clock,
  Lightbulb,
  Award,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

interface Strategy {
  id: string
  name: string
  description: string
  pros: string[]
  cons: string[]
  score: number
  recommended: boolean
  complexity: 'Facile' | 'Moyen' | 'Avancé'
  learningSpeed: string
  budgetEfficiency: string
  details: {
    adSets: number
    adsPerSet: number
    totalAds: number
    optimizationLevel: string
  }
}

const strategies: Strategy[] = [
  {
    id: 'consolidee',
    name: 'Stratégie Consolidée (2 Ad Sets)',
    description: 'CBO avec 2 ad sets : Luminaires (5 ads) et Tableaux (5 ads). Design promo uniforme.',
    pros: [
      'Idéal pour débutants Meta Ads',
      'L\'algorithme a plus de budget par ad set pour optimiser',
      'Sortie plus rapide de la phase d\'apprentissage',
      'Gestion simplifiée (moins de variables à surveiller)',
      'CBO répartit automatiquement le budget vers les meilleurs performers',
      'Plus de données consolidées par ad set = décisions algo plus fiables',
      'Moins de risque de sur-segmentation avec petit budget'
    ],
    cons: [
      'Moins de granularité sur les insights par catégorie',
      'Audiences moins ciblées par type de produit',
      'Difficile d\'identifier quel type de tableau performe mieux'
    ],
    score: 92,
    recommended: true,
    complexity: 'Facile',
    learningSpeed: '2-4 jours',
    budgetEfficiency: 'Excellente',
    details: {
      adSets: 2,
      adsPerSet: 5,
      totalAds: 10,
      optimizationLevel: 'Maximum via CBO'
    }
  },
  {
    id: 'segmentee',
    name: 'Stratégie Segmentée (5 Ad Sets)',
    description: '5 ad sets par catégorie : Suspension, Applique murale, Art abstrait, Art floral, Voyage artistique.',
    pros: [
      'Audiences très ciblées par intérêt',
      'Insights détaillés par catégorie de produit',
      'Possibilité de différencier les messages créatifs',
      'Meilleur contrôle sur le budget par catégorie'
    ],
    cons: [
      'Budget fragmenté entre 5 ad sets (moins par ad set)',
      'Phase d\'apprentissage plus longue (50 conversions/ad set)',
      'Risque de sous-performance si budget insuffisant',
      'Plus complexe à gérer pour un débutant',
      'CBO peut starve certains ad sets prometteurs',
      'Audiences potentiellement trop petites'
    ],
    score: 68,
    recommended: false,
    complexity: 'Avancé',
    learningSpeed: '5-10 jours',
    budgetEfficiency: 'Moyenne',
    details: {
      adSets: 5,
      adsPerSet: 3,
      totalAds: 15,
      optimizationLevel: 'Dilué par fragmentation'
    }
  }
]

const campaignStructure = {
  luminaires: {
    name: 'Luminaires',
    products: ['Suspension #1', 'Suspension #2', 'Applique #1', 'Applique #2', 'Applique #3'],
    emoji: '💡',
    color: 'from-amber-400 to-orange-500'
  },
  tableaux: {
    name: 'Tableaux',
    products: ['Art Abstrait #1', 'Art Abstrait #2', 'Art Floral #1', 'Art Floral #2', 'Voyage Artistique #1'],
    emoji: '🎨',
    color: 'from-purple-400 to-pink-500'
  }
}

const budgetRecommendations = [
  { budget: '50-100€/jour', recommendation: '2 ad sets', confidence: 'Fortement recommandé', color: 'text-green-400' },
  { budget: '100-200€/jour', recommendation: '2-3 ad sets', confidence: 'Recommandé', color: 'text-green-400' },
  { budget: '200-500€/jour', recommendation: '3-4 ad sets', confidence: 'Possible', color: 'text-yellow-400' },
  { budget: '500€+/jour', recommendation: '5 ad sets', confidence: 'Envisageable', color: 'text-blue-400' }
]

export default function Home() {
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null)
  const [showStructure, setShowStructure] = useState(false)
  const [showChecklist, setShowChecklist] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>('recommendation')

  useEffect(() => {
    // Add snowflakes effect
    const createSnowflake = () => {
      const snowflake = document.createElement('div')
      snowflake.className = 'snowflake'
      snowflake.innerHTML = '❄'
      snowflake.style.left = Math.random() * 100 + 'vw'
      snowflake.style.animationDuration = Math.random() * 3 + 7 + 's'
      snowflake.style.opacity = String(Math.random() * 0.6 + 0.4)
      snowflake.style.fontSize = Math.random() * 10 + 10 + 'px'
      document.body.appendChild(snowflake)

      setTimeout(() => {
        snowflake.remove()
      }, 10000)
    }

    const interval = setInterval(createSnowflake, 500)
    return () => clearInterval(interval)
  }, [])

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <main className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-8">
        <div className="glass-card p-6 md:p-8 christmas-gradient glow-green">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gift className="w-10 h-10 text-white animate-float" />
            <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
              Meta Ads Strategy Advisor
            </h1>
            <Sparkles className="w-10 h-10 text-yellow-300 animate-pulse" />
          </div>
          <p className="text-center text-white/90 text-lg">
            🎄 Optimisez votre campagne de Noël • Promo Fin d&apos;Année 🎄
          </p>
        </div>
      </header>

      {/* Context Summary */}
      <section className="max-w-6xl mx-auto mb-8">
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Target className="w-6 h-6 text-meta-blue" />
            Votre Contexte
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-meta-blue">45</div>
              <div className="text-sm text-gray-400">Images totales</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-purple-400">5</div>
              <div className="text-sm text-gray-400">Catégories</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-green-400">10</div>
              <div className="text-sm text-gray-400">Produits à tester</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-yellow-400">CBO</div>
              <div className="text-sm text-gray-400">Type campagne</div>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {['Suspension', 'Applique murale', 'Art abstrait', 'Art floral', 'Voyage artistique'].map((cat) => (
              <span key={cat} className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Main Recommendation */}
      <section className="max-w-6xl mx-auto mb-8">
        <div className="glass-card overflow-hidden">
          <button 
            className="w-full p-6 flex items-center justify-between text-left"
            onClick={() => toggleSection('recommendation')}
          >
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Award className="w-6 h-6 text-yellow-400" />
              🏆 Recommandation Principale
            </h2>
            {expandedSection === 'recommendation' ? 
              <ChevronUp className="w-6 h-6 text-white" /> : 
              <ChevronDown className="w-6 h-6 text-white" />
            }
          </button>
          
          {expandedSection === 'recommendation' && (
            <div className="px-6 pb-6 fade-in">
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-10 h-10 text-green-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-white">Stratégie 2 Ad Sets</h3>
                      <span className="winner-badge">RECOMMANDÉE</span>
                    </div>
                    <p className="text-gray-300 text-lg mb-4">
                      <strong>OUI, votre approche actuelle est optimale</strong> pour un débutant souhaitant tester rapidement ses produits avec CBO.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="text-green-400 font-bold">✓ Test rapide</div>
                        <div className="text-sm text-gray-400">Sortie phase apprentissage accélérée</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="text-green-400 font-bold">✓ CBO efficace</div>
                        <div className="text-sm text-gray-400">Budget concentré = meilleure optimisation</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="text-green-400 font-bold">✓ Débutant-friendly</div>
                        <div className="text-sm text-gray-400">Moins de complexité, plus de résultats</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-yellow-400 mb-2">Pourquoi pas 5 ad sets ?</h4>
                    <p className="text-gray-300 text-sm">
                      Avec 5 ad sets segmentés, votre budget serait dilué. Meta recommande ~50 conversions/ad set/semaine 
                      pour sortir de la phase d&apos;apprentissage. Avec un petit budget, 5 ad sets = apprentissage éternel et 
                      résultats inconsistants.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Strategy Comparison */}
      <section className="max-w-6xl mx-auto mb-8">
        <div className="glass-card overflow-hidden">
          <button 
            className="w-full p-6 flex items-center justify-between text-left"
            onClick={() => toggleSection('comparison')}
          >
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-meta-blue" />
              Comparaison Détaillée des Stratégies
            </h2>
            {expandedSection === 'comparison' ? 
              <ChevronUp className="w-6 h-6 text-white" /> : 
              <ChevronDown className="w-6 h-6 text-white" />
            }
          </button>

          {expandedSection === 'comparison' && (
            <div className="px-6 pb-6 fade-in">
              <div className="grid md:grid-cols-2 gap-6">
                {strategies.map((strategy) => (
                  <div 
                    key={strategy.id}
                    className={`relative rounded-xl p-6 transition-all duration-300 cursor-pointer ${
                      strategy.recommended 
                        ? 'bg-gradient-to-br from-green-500/20 to-emerald-600/20 border-2 border-green-500/50' 
                        : 'bg-white/5 border border-white/10 hover:border-white/30'
                    } ${selectedStrategy === strategy.id ? 'ring-2 ring-meta-blue' : ''}`}
                    onClick={() => setSelectedStrategy(selectedStrategy === strategy.id ? null : strategy.id)}
                  >
                    {strategy.recommended && (
                      <div className="absolute -top-3 left-4">
                        <span className="winner-badge flex items-center gap-1">
                          <Award className="w-4 h-4" /> GAGNANT
                        </span>
                      </div>
                    )}

                    <h3 className="text-xl font-bold text-white mb-2 mt-2">{strategy.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{strategy.description}</p>

                    {/* Score Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-400">Score Global</span>
                        <span className={`font-bold ${strategy.score >= 80 ? 'text-green-400' : 'text-yellow-400'}`}>
                          {strategy.score}/100
                        </span>
                      </div>
                      <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className={`score-bar h-full ${strategy.score >= 80 ? 'from-green-400 to-emerald-500' : 'from-yellow-400 to-orange-500'}`}
                          style={{ width: `${strategy.score}%` }}
                        />
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="bg-white/5 rounded-lg p-2 text-center">
                        <div className={`text-xs ${
                          strategy.complexity === 'Facile' ? 'text-green-400' : 
                          strategy.complexity === 'Moyen' ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {strategy.complexity}
                        </div>
                        <div className="text-xs text-gray-500">Complexité</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-2 text-center">
                        <div className="text-xs text-meta-blue">{strategy.learningSpeed}</div>
                        <div className="text-xs text-gray-500">Apprentissage</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-2 text-center">
                        <div className={`text-xs ${
                          strategy.budgetEfficiency === 'Excellente' ? 'text-green-400' : 'text-yellow-400'
                        }`}>
                          {strategy.budgetEfficiency}
                        </div>
                        <div className="text-xs text-gray-500">Efficacité</div>
                      </div>
                    </div>

                    {/* Pros */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-green-400 mb-2 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Avantages
                      </h4>
                      <ul className="space-y-1">
                        {strategy.pros.slice(0, selectedStrategy === strategy.id ? undefined : 3).map((pro, idx) => (
                          <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                            <span className="text-green-400 mt-0.5">+</span>
                            {pro}
                          </li>
                        ))}
                        {!selectedStrategy && strategy.pros.length > 3 && (
                          <li className="text-sm text-meta-blue">+ {strategy.pros.length - 3} autres...</li>
                        )}
                      </ul>
                    </div>

                    {/* Cons */}
                    <div>
                      <h4 className="text-sm font-semibold text-red-400 mb-2 flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> Inconvénients
                      </h4>
                      <ul className="space-y-1">
                        {strategy.cons.slice(0, selectedStrategy === strategy.id ? undefined : 2).map((con, idx) => (
                          <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                            <span className="text-red-400 mt-0.5">−</span>
                            {con}
                          </li>
                        ))}
                        {!selectedStrategy && strategy.cons.length > 2 && (
                          <li className="text-sm text-meta-blue">+ {strategy.cons.length - 2} autres...</li>
                        )}
                      </ul>
                    </div>

                    {selectedStrategy === strategy.id && (
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-1">
                          <Layers className="w-4 h-4 text-meta-blue" /> Structure
                        </h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div><span className="text-gray-400">Ad Sets:</span> <span className="text-white">{strategy.details.adSets}</span></div>
                          <div><span className="text-gray-400">Ads/Set:</span> <span className="text-white">{strategy.details.adsPerSet}</span></div>
                          <div><span className="text-gray-400">Total Ads:</span> <span className="text-white">{strategy.details.totalAds}</span></div>
                          <div><span className="text-gray-400">Optimisation:</span> <span className="text-white text-xs">{strategy.details.optimizationLevel}</span></div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Recommended Structure */}
      <section className="max-w-6xl mx-auto mb-8">
        <div className="glass-card overflow-hidden">
          <button 
            className="w-full p-6 flex items-center justify-between text-left"
            onClick={() => toggleSection('structure')}
          >
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-6 h-6 text-purple-400" />
              Structure Recommandée de votre Campagne
            </h2>
            {expandedSection === 'structure' ? 
              <ChevronUp className="w-6 h-6 text-white" /> : 
              <ChevronDown className="w-6 h-6 text-white" />
            }
          </button>

          {expandedSection === 'structure' && (
            <div className="px-6 pb-6 fade-in">
              {/* Campaign Level */}
              <div className="relative">
                <div className="meta-gradient rounded-xl p-4 mb-4 glow-blue">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      🎯
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg">Campagne CBO - Promo Noël</div>
                      <div className="text-white/70 text-sm">Budget réparti automatiquement • Objectif: Conversions</div>
                    </div>
                  </div>
                </div>

                {/* Connection Lines */}
                <div className="flex justify-center mb-4">
                  <div className="w-0.5 h-8 bg-gradient-to-b from-meta-blue to-transparent"></div>
                </div>

                {/* Ad Sets */}
                <div className="grid md:grid-cols-2 gap-6">
                  {Object.entries(campaignStructure).map(([key, category]) => (
                    <div key={key} className="relative">
                      <div className={`bg-gradient-to-r ${category.color} rounded-xl p-1`}>
                        <div className="bg-slate-900/90 rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-3xl">{category.emoji}</span>
                            <div>
                              <div className="font-bold text-white">Ad Set: {category.name}</div>
                              <div className="text-sm text-gray-400">5 ads • Audience large</div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            {category.products.map((product, idx) => (
                              <div key={idx} className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
                                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color}`}></div>
                                <span className="text-sm text-gray-300">Ad {idx + 1}: {product}</span>
                                <span className="ml-auto text-xs px-2 py-0.5 bg-christmas-red/20 text-christmas-red rounded-full">
                                  🎁 PROMO
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Budget Recommendations */}
      <section className="max-w-6xl mx-auto mb-8">
        <div className="glass-card overflow-hidden">
          <button 
            className="w-full p-6 flex items-center justify-between text-left"
            onClick={() => toggleSection('budget')}
          >
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-green-400" />
              Guide Budget vs Nombre d&apos;Ad Sets
            </h2>
            {expandedSection === 'budget' ? 
              <ChevronUp className="w-6 h-6 text-white" /> : 
              <ChevronDown className="w-6 h-6 text-white" />
            }
          </button>

          {expandedSection === 'budget' && (
            <div className="px-6 pb-6 fade-in">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Budget/Jour</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Ad Sets Recommandés</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Niveau de Confiance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {budgetRecommendations.map((rec, idx) => (
                      <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition">
                        <td className="py-3 px-4 text-white font-medium">{rec.budget}</td>
                        <td className="py-3 px-4">
                          <span className="px-3 py-1 bg-meta-blue/20 text-meta-blue rounded-full text-sm">
                            {rec.recommendation}
                          </span>
                        </td>
                        <td className={`py-3 px-4 ${rec.color} font-medium`}>{rec.confidence}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-300">
                    <strong className="text-blue-400">Règle d&apos;or :</strong> Chaque ad set a besoin d&apos;environ 
                    50 conversions par semaine pour sortir de la phase d&apos;apprentissage. 
                    Calculez : (Coût par conversion × 50) × nombre d&apos;ad sets = budget minimum/semaine.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Action Checklist */}
      <section className="max-w-6xl mx-auto mb-8">
        <div className="glass-card overflow-hidden">
          <button 
            className="w-full p-6 flex items-center justify-between text-left"
            onClick={() => toggleSection('checklist')}
          >
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-400" />
              ✅ Checklist de Lancement
            </h2>
            {expandedSection === 'checklist' ? 
              <ChevronUp className="w-6 h-6 text-white" /> : 
              <ChevronDown className="w-6 h-6 text-white" />
            }
          </button>

          {expandedSection === 'checklist' && (
            <div className="px-6 pb-6 fade-in">
              <div className="space-y-3">
                {[
                  { task: 'Créer 1 campagne CBO avec objectif "Ventes" ou "Conversions"', category: 'Structure' },
                  { task: 'Ad Set 1 "Luminaires" : audience large décoration intérieure + éclairage', category: 'Ad Sets' },
                  { task: 'Ad Set 2 "Tableaux" : audience large art + décoration murale', category: 'Ad Sets' },
                  { task: 'Ajouter 5 ads dans chaque ad set (1 image produit = 1 ad)', category: 'Créatifs' },
                  { task: 'Design promo uniforme sur toutes les ads (badge -X%, texte Noël)', category: 'Créatifs' },
                  { task: 'Définir budget minimum recommandé : 20-30€/ad set/jour', category: 'Budget' },
                  { task: 'Configurer le pixel Facebook sur votre site', category: 'Tracking' },
                  { task: 'Installer les événements de conversion (Purchase, AddToCart)', category: 'Tracking' },
                  { task: 'Laisser tourner minimum 3-5 jours avant toute modification', category: 'Patience' },
                  { task: 'Analyser les résultats et couper les ads sous-performantes', category: 'Optimisation' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white/5 rounded-lg p-3 hover:bg-white/10 transition">
                    <div className="w-6 h-6 rounded-full bg-meta-blue/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-meta-blue font-bold">{idx + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-white">{item.task}</div>
                      <div className="text-xs text-gray-500">{item.category}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Pro Tips */}
      <section className="max-w-6xl mx-auto mb-8">
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            💡 Conseils Pro pour Noël
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-christmas-red/20 to-christmas-green/20 rounded-xl p-4 border border-white/10">
              <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                <Clock className="w-5 h-5 text-christmas-gold" />
                Timing Crucial
              </h3>
              <p className="text-sm text-gray-300">
                Lancez votre campagne au moins 5-7 jours avant la date limite de livraison Noël. 
                L&apos;algorithme a besoin de temps pour apprendre.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-white/10">
              <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                Scalez Graduellement
              </h3>
              <p className="text-sm text-gray-300">
                Si une ad performe, augmentez le budget de 20-30% max par jour pour ne pas 
                perturber l&apos;algorithme.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-4 border border-white/10">
              <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                Audiences Larges
              </h3>
              <p className="text-sm text-gray-300">
                En période de fêtes, les audiences larges performent mieux car plus de personnes 
                cherchent des cadeaux en dehors de leurs intérêts habituels.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-4 border border-white/10">
              <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                <Gift className="w-5 h-5 text-green-400" />
                Message Cadeau
              </h3>
              <p className="text-sm text-gray-300">
                Ajoutez &quot;Idée cadeau parfaite&quot; ou &quot;Livré avant Noël&quot; dans vos textes pour 
                augmenter le taux de clic.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Verdict */}
      <section className="max-w-6xl mx-auto mb-8">
        <div className="christmas-gradient rounded-2xl p-6 glow-green">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Award className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Verdict Final</h2>
              <p className="text-white/80">Notre recommandation pour votre campagne Noël</p>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-white text-lg leading-relaxed">
              <strong>✅ Gardez votre structure à 2 ad sets</strong> (Luminaires & Tableaux). 
              C&apos;est la meilleure approche pour un débutant car elle permet à l&apos;algorithme Meta 
              de concentrer ses données et d&apos;optimiser efficacement. Une fois que vous aurez 
              identifié vos produits gagnants et accumulé des données, vous pourrez ensuite 
              tester des segmentations plus fines dans une phase 2.
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-3 justify-center">
            <span className="px-4 py-2 bg-white/20 rounded-full text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> Test rapide
            </span>
            <span className="px-4 py-2 bg-white/20 rounded-full text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> CBO optimisé
            </span>
            <span className="px-4 py-2 bg-white/20 rounded-full text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> Débutant-friendly
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto text-center py-8">
        <p className="text-gray-500 text-sm">
          🎄 Bonne campagne de Noël et bonnes ventes ! 🎁
        </p>
        <p className="text-gray-600 text-xs mt-2">
          Meta Ads Strategy Advisor • 2024
        </p>
      </footer>
    </main>
  )
}
