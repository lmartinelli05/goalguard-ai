'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import VideoPlayer from '@/components/video/VideoPlayer';
import Timeline from '@/components/analysis/Timeline';
import HighlightList from '@/components/analysis/HighlightList';
import BiomechanicalOverlay from '@/components/video/BiomechanicalOverlay';
import { HighlightEvent, Match, TechnicalStandard, BiomechanicalFrame } from '@/types';
import { Loader2, LayoutDashboard, FileText, Zap } from 'lucide-react';
import Link from 'next/link';

// MOCK DATA
const MOCK_MATCH: Match = {
  id: 'match_123',
  date: '2026-10-13',
  opponent: 'AC Milan',
  videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  duration: 600,
};

const MOCK_BLUEPRINT: TechnicalStandard[] = [
  { id: 's1', category: 'POSITIONING', parameter: 'Allineamento Centro Porta', idealValue: 0, tolerance: 0.3, unit: 'meters', description: 'Centratura rispetto ai pali.' },
  { id: 's2', category: 'TORSO', parameter: 'Inclinazione Busto', idealValue: 15, tolerance: 5, unit: 'degrees', description: 'Busto inclinato per reattività.' },
  { id: 's3', category: 'HANDS', parameter: 'Altezza Mani Attesa', idealValue: 0.9, tolerance: 0.1, unit: 'meters', description: 'Mani all\'altezza del bacino.' },
];

const MOCK_EVENTS: HighlightEvent[] = [
  { id: 'ev_1', matchId: 'match_123', playerId: 'p_1', type: 'SAVE', startTime: 12.5, endTime: 18.2, label: 'Parata riflesso bassa', isConfirmed: false, confidence: 0.92 },
  { id: 'ev_2', matchId: 'match_123', playerId: 'p_1', type: 'DISTRIBUTION', startTime: 45.0, endTime: 52.0, label: 'Rilancio lungo preciso', isConfirmed: true, confidence: 0.85 },
  { id: 'ev_3', matchId: 'match_123', playerId: 'p_1', type: 'SAVE', startTime: 120.4, endTime: 128.1, label: 'Uscita alta decisa', isConfirmed: false, confidence: 0.78 },
];

// Mocking a biomechanical frame for the current time
const getMockFrame = (time: number): BiomechanicalFrame => ({
  timestamp: time,
  pose: [
    { joint: 'hip_center', x: 50 + Math.sin(time) * 2, y: 60 },
    { joint: 'shoulder_center', x: 50 + Math.sin(time) * 2, y: 40 },
  ],
  metrics: MOCK_BLUEPRINT.map(s => ({
    parameterId: s.id,
    value: s.idealValue + (Math.random() - 0.5),
    status: Math.random() > 0.7 ? 'ERROR' : Math.random() > 0.4 ? 'WARNING' : 'CORRECT'
  }))
});

export default function AnalysisPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [events, setEvents] = useState<HighlightEvent[]>(MOCK_EVENTS);
  const [activeEventId, setActiveEventId] = useState<string | undefined>();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleEventSelect = (event: HighlightEvent) => {
    setActiveEventId(event.id);
    setCurrentTime(event.startTime);
    setIsPlaying(true);
  };

  const handleConfirmEvent = (id: string) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, isConfirmed: true } : e));
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    if (activeEventId === id) setActiveEventId(undefined);
  };

  const generateReport = () => {
    setIsAnalyzing(true);
    // Simulate AI heavy lifting
    setTimeout(() => {
      setIsAnalyzing(false);
      router.push(`/analysis/${params.matchId}/report`);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-zinc-950 text-white">
        <Loader2 className="animate-spin mb-4 text-blue-500" size={48} />
        <p className="text-zinc-400 animate-pulse">Caricamento Analisi Video...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 overflow-hidden">
      <div className="flex-1 flex flex-col p-6 space-y-6 overflow-y-auto">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400">
              <LayoutDashboard size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold">Analisi Partita: {MOCK_MATCH.opponent}</h1>
              <p className="text-sm text-zinc-500">Data: {MOCK_MATCH.date} • Portiere: Marco Rossi</p>
            </div >
          </div >
          <button 
            onClick={generateReport}
            disabled={isAnalyzing}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20"
          >
            {isAnalyzing ? <Loader2 className="animate-spin" size={20} /> : <Zap size={20} />}
            {isAnalyzing ? 'Analisi in corso...' : 'Genera Report Completo'}
          </button>
        </header>

        <div className="space-y-6">
          <div className="relative">
            <VideoPlayer 
              url={MOCK_MATCH.videoUrl}
              currentTime={currentTime}
              setCurrentTime={setCurrentTime}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              playbackRate={playbackRate}
              setPlaybackRate={setPlaybackRate}
            />
            <BiomechanicalOverlay 
              isVisible={true}
              blueprint={MOCK_BLUEPRINT}
              frame={getMockFrame(currentTime)}
            />
          </div >

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-medium text-zinc-500">
              <span>0:00</span>
              <span>{currentTime.toFixed(1)}s / {MOCK_MATCH.duration}s</span>
            </div >
            <Timeline 
              duration={MOCK_MATCH.duration}
              currentTime={currentTime}
              setCurrentTime={setCurrentTime}
              events={events}
              onEventClick={handleEventSelect}
            />
          </div >
        </div >
      </div >

      <HighlightList 
        events={events}
        activeEventId={activeEventId}
        onEventSelect={handleEventSelect}
        onConfirmEvent={handleConfirmEvent}
        onDeleteEvent={handleDeleteEvent}
      />
    </div >
  );
}
