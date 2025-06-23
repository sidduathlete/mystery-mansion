import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  RefreshCw, Download, Play, Code, 
  TrendingUp, Users, DollarSign, Target,
  Palette, Lightbulb, FileText, Presentation
} from 'lucide-react';
import { StartupData } from '../types';

interface DashboardProps {
  data: StartupData;
  onRegenerate: (dream: string, autoMode?: boolean) => void;
  onTryAnother: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ data, onRegenerate, onTryAnother }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Lightbulb },
    { id: 'branding', label: 'Brand & Design', icon: Palette },
    { id: 'monetization', label: 'Business Model', icon: DollarSign },
    { id: 'competition', label: 'Market Analysis', icon: Target },
    { id: 'pitch', label: 'Investor Pitch', icon: Presentation }
  ];

  const exportOptions = [
    { label: 'Download PDF Plan', icon: FileText, action: () => console.log('Export PDF') },
    { label: 'Build Prototype', icon: Code, action: () => console.log('Build prototype') },
    { label: 'Generate Pitch Video', icon: Play, action: () => console.log('Generate video') }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center space-x-2 bg-green-500/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-green-500/30">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm">Startup Generated Successfully!</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            {data.name}
          </h1>
          <p className="text-xl text-purple-200 mb-2">{data.pitch}</p>
          <p className="text-lg text-purple-300 italic">"{data.slogan}"</p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-wrap gap-4 justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <button
            onClick={() => onRegenerate(data.dream)}
            className="flex items-center space-x-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Regenerate</span>
          </button>
          
          <button
            onClick={onTryAnother}
            className="flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white font-medium hover:bg-white/20 transition-colors"
          >
            <Lightbulb className="w-4 h-4" />
            <span>Try Another Idea</span>
          </button>

          {exportOptions.map((option, index) => (
            <button
              key={index}
              onClick={option.action}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 rounded-lg text-white font-medium transition-all"
            >
              <option.icon className="w-4 h-4" />
              <span>{option.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/10 text-purple-200 hover:bg-white/20'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'overview' && <OverviewTab data={data} />}
          {activeTab === 'branding' && <BrandingTab data={data} />}
          {activeTab === 'monetization' && <MonetizationTab data={data} />}
          {activeTab === 'competition' && <CompetitionTab data={data} />}
          {activeTab === 'pitch' && <PitchTab data={data} />}
        </motion.div>
      </div>
    </div>
  );
};

const OverviewTab: React.FC<{ data: StartupData }> = ({ data }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2 text-purple-400" />
          Core Function
        </h3>
        <p className="text-purple-200">{data.appLogic.coreFunction}</p>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2 text-purple-400" />
          Key Features
        </h3>
        <ul className="space-y-2">
          {data.appLogic.keyFeatures.map((feature, index) => (
            <li key={index} className="text-purple-200 flex items-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
        <TrendingUp className="w-5 h-5 mr-2 text-purple-400" />
        User Journey
      </h3>
      <ol className="space-y-3">
        {data.appLogic.userFlow.map((step, index) => (
          <li key={index} className="text-purple-200 flex items-start">
            <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">
              {index + 1}
            </div>
            {step}
          </li>
        ))}
      </ol>
    </div>
  </div>
);

const BrandingTab: React.FC<{ data: StartupData }> = ({ data }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <h3 className="text-xl font-semibold text-white mb-4">Brand Colors</h3>
      <div className="grid grid-cols-5 gap-4 mb-6">
        {data.brand.palette.map((color, index) => (
          <div key={index} className="text-center">
            <div 
              className="w-16 h-16 rounded-xl mb-2 border-2 border-white/20"
              style={{ backgroundColor: color }}
            ></div>
            <span className="text-xs text-purple-200">{color}</span>
          </div>
        ))}
      </div>
      
      <h4 className="text-lg font-semibold text-white mb-2">Brand Vibe</h4>
      <p className="text-purple-200">{data.brand.vibe}</p>
    </div>

    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <h3 className="text-xl font-semibold text-white mb-4">Landing Page Sections</h3>
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-white">Hero</h4>
          <p className="text-purple-200 text-sm">{data.sections.hero}</p>
        </div>
        <div>
          <h4 className="font-semibold text-white">Problem</h4>
          <p className="text-purple-200 text-sm">{data.sections.problem}</p>
        </div>
        <div>
          <h4 className="font-semibold text-white">Solution</h4>
          <p className="text-purple-200 text-sm">{data.sections.solution}</p>
        </div>
        <div>
          <h4 className="font-semibold text-white">Features</h4>
          <ul className="text-purple-200 text-sm space-y-1">
            {data.sections.features.map((feature, index) => (
              <li key={index}>• {feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const MonetizationTab: React.FC<{ data: StartupData }> = ({ data }) => (
  <div className="space-y-8">
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
        <DollarSign className="w-6 h-6 mr-2 text-green-400" />
        {data.monetization.model}
      </h3>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {data.monetization.tiers.map((tier, index) => (
        <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 relative">
          {index === 1 && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
              Most Popular
            </div>
          )}
          
          <h4 className="text-xl font-semibold text-white mb-2">{tier.name}</h4>
          <div className="text-3xl font-bold text-white mb-4">{tier.price}</div>
          
          <ul className="space-y-2">
            {tier.features.map((feature, featureIndex) => (
              <li key={featureIndex} className="text-purple-200 flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

const CompetitionTab: React.FC<{ data: StartupData }> = ({ data }) => (
  <div className="space-y-8">
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
        <Target className="w-5 h-5 mr-2 text-purple-400" />
        Unique Selling Proposition
      </h3>
      <p className="text-purple-200 text-lg">{data.competitors.usp}</p>
    </div>

    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <h3 className="text-xl font-semibold text-white mb-6">Competitive Analysis</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.competitors.competitors.map((competitor, index) => (
          <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
            <h4 className="font-semibold text-white mb-2">{competitor.name}</h4>
            <p className="text-red-300 text-sm">
              <strong>Weakness:</strong> {competitor.weakness}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const PitchTab: React.FC<{ data: StartupData }> = ({ data }) => (
  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
    <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
      <Presentation className="w-6 h-6 mr-2 text-purple-400" />
      60-Second Investor Pitch
    </h3>
    
    <div className="bg-white/5 rounded-lg p-6 border border-white/10 mb-6">
      <p className="text-purple-100 text-lg leading-relaxed whitespace-pre-line">
        {data.pitchScript}
      </p>
    </div>

    <div className="flex gap-4">
      <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg text-white font-medium hover:from-green-700 hover:to-blue-700 transition-all">
        <Play className="w-4 h-4" />
        <span>Generate AI Video</span>
      </button>
      
      <button className="flex items-center space-x-2 px-6 py-3 bg-white/10 border border-white/20 rounded-lg text-white font-medium hover:bg-white/20 transition-colors">
        <Download className="w-4 h-4" />
        <span>Download Script</span>
      </button>
    </div>
  </div>
);

export default Dashboard;