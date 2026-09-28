import React, { useState, useEffect } from 'react';
import { 
  Users, UserCheck, UserX, Clock, Play, Video, Server, Database, 
  Search, Download, Plus, AlertTriangle, ShieldCheck, ShieldAlert,
  ChevronDown, LayoutDashboard, Calendar, FileText, Settings, Bell,
  MoreVertical, CheckCircle2, XCircle
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend
} from 'recharts';

const kpiData = [
  { title: 'Total Enrolled', value: '2,450', icon: Users, color: 'text-blue-600', bgColor: 'bg-blue-100', trend: '+12 this week' },
  { title: 'Present Today', value: '1,840', subValue: '75%', icon: UserCheck, color: 'text-emerald-600', bgColor: 'bg-emerald-100', trend: 'vs 72% yesterday' },
  { title: 'Absent / Late', value: '610 / 120', icon: UserX, color: 'text-amber-600', bgColor: 'bg-amber-100', trend: '15 unexcused' },
  { title: 'Avg Recognition Speed', value: '180 ms', icon: Clock, color: 'text-purple-600', bgColor: 'bg-purple-100', trend: 'P99: 210ms' },
];

const weeklyAttendanceData = [
  { day: 'Mon', present: 85, absent: 15 },
  { day: 'Tue', present: 88, absent: 12 },
  { day: 'Wed', present: 92, absent: 8 },
  { day: 'Thu', present: 87, absent: 13 },
  { day: 'Fri', present: 75, absent: 25 },
];

const punctualityData = [
  { name: 'On Time', value: 75, color: '#10b981' }, // Emerald-500
  { name: 'Late', value: 15, color: '#f59e0b' },    // Amber-500
  { name: 'Absent', value: 10, color: '#f43f5e' },   // Rose-500
];

const lowAttendanceStudents = [
  { id: 'S-1029', name: 'Alex Johnson', course: 'CS101', percentage: 68 },
  { id: 'S-2041', name: 'Maria Garcia', course: 'ENG202', percentage: 71 },
  { id: 'S-3155', name: 'David Smith', course: 'MATH300', percentage: 73 },
];

const initialLiveStream = [
  { id: 1, name: 'Sarah Connor', studentId: 'S-9912', matchScore: 98, time: 'Just now', status: 'pass' },
  { id: 2, name: 'John Doe', studentId: 'S-8821', matchScore: 95, time: '2 min ago', status: 'pass' },
  { id: 3, name: 'Unknown Face', studentId: 'N/A', matchScore: 42, time: '5 min ago', status: 'spoof' },
  { id: 4, name: 'Emily Chen', studentId: 'S-7734', matchScore: 99, time: '12 min ago', status: 'pass' },
  { id: 5, name: 'Michael Brown', studentId: 'S-6645', matchScore: 91, time: '15 min ago', status: 'pass' },
];

export default function App() {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [liveStream, setLiveStream] = useState(initialLiveStream);
  
  // NEW: State to track which page is currently active
  const [activePage, setActivePage] = useState('Dashboard');

  // Simulate real-time ticker updates when session is active
  useEffect(() => {
    let interval;
    if (isSessionActive) {
      interval = setInterval(() => {
        const newDetections = [
          { id: Date.now(), name: 'James Wilson', studentId: `S-${Math.floor(1000 + Math.random() * 9000)}`, matchScore: Math.floor(85 + Math.random() * 14), time: 'Just now', status: Math.random() > 0.1 ? 'pass' : 'spoof' }
        ];
        setLiveStream(prev => [...newDetections, ...prev].slice(0, 8));
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isSessionActive]);

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <div className="flex items-center gap-2 text-indigo-600">
            <UserCheck className="w-6 h-6" />
            <span className="text-xl font-bold tracking-tight text-slate-900">VisionTrack</span>
          </div>
        </div>
        
        {/* NEW: Updated Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          <NavItem 
            icon={LayoutDashboard} 
            label="Dashboard" 
            active={activePage === 'Dashboard'} 
            onClick={() => setActivePage('Dashboard')} 
          />
          <NavItem 
            icon={Calendar} 
            label="Class Schedule" 
            active={activePage === 'Class Schedule'} 
            onClick={() => setActivePage('Class Schedule')} 
          />
          <NavItem 
            icon={Users} 
            label="Student Directory" 
            active={activePage === 'Student Directory'} 
            onClick={() => setActivePage('Student Directory')} 
          />
          <NavItem 
            icon={FileText} 
            label="Reports & Logs" 
            active={activePage === 'Reports & Logs'} 
            onClick={() => setActivePage('Reports & Logs')} 
          />
          <NavItem 
            icon={Settings} 
            label="System Settings" 
            active={activePage === 'System Settings'} 
            onClick={() => setActivePage('System Settings')} 
          />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-sm font-semibold">Admin User</p>
              <p className="text-xs text-slate-500">System Operator</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-8 shrink-0">
         {/* NEW: Dynamic Header Title */}
         <h1 className="text-xl font-semibold text-black tracking-tight whitespace-nowrap shrink-0 mr-4">
           {activePage}
         </h1>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden lg:block w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Manual override (ID/Name)..." 
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              />
            </div>
            
            <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
            
            {/* Quick Actions Buttons */}
            <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export Log</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm transition-colors">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Enroll Student</span>
            </button>
            
            <button className="relative p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Scrollable Dashboard Area */}
        <div className="flex-1 overflow-auto p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* ========================================= */}
            {/*             DASHBOARD VIEW                */}
            {/* ========================================= */}
            {activePage === 'Dashboard' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {kpiData.map((kpi, idx) => (
                    <div key={idx} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                    <p className="text-sm font-medium text-slate-500 mb-1 leading-tight">{kpi.title}</p>
                    <h3 className="text-2xl font-bold text-slate-800 flex items-baseline gap-1.5 flex-wrap mt-1.5">
                    {kpi.value}
                    {kpi.subValue && <span className="text-sm font-medium text-slate-500 shrink-0">({kpi.subValue})</span>}
                    </h3>
                    </div>
        <div className={`flex items-center justify-center shrink-0 w-10 h-10 rounded-lg ${kpi.title === 'Avg Recognition Speed' ? 'mr-10' : ''} ${kpi.bgColor} ${kpi.color}`}>
                    <kpi.icon className="w-5 h-5 m-0 p-0" />
                      </div>
                        </div>
                      <div className="mt-4 text-sm text-slate-500 font-medium">
                        {kpi.trend}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  {/* Left Column (Main Content) - Spans 2 columns on XL screens */}
                  <div className="xl:col-span-2 space-y-6">
                    
                    <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex-1">
                          <h2 className="text-lg font-semibold text-slate-800 mb-1">Active Class & Session</h2>
                          <p className="text-sm text-slate-500 mb-4">Select a class to initialize the vision pipeline.</p>
                          
                          <div className="relative w-full max-w-xs">
                            <select className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-2.5 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium">
                              <option>CS101 - Intro to Comp Sci (Sec A)</option>
                              <option>MTH205 - Calculus II</option>
                              <option>PHY101 - Physics Lab</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                          </div>
                          
                          <div className="mt-4 flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1.5 text-slate-600">
                              <Clock className="w-4 h-4 text-slate-400" />
                              <span>Next: 10:00 AM - 11:30 AM</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-600">
                              <Users className="w-4 h-4 text-slate-400" />
                              <span>Expected Roster: 45</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="shrink-0 flex items-center justify-center border-l-0 md:border-l border-slate-100 md:pl-8">
                          <button 
                            onClick={() => setIsSessionActive(!isSessionActive)}
                            className={`relative group flex items-center justify-center w-40 h-40 rounded-full transition-all duration-300 ${isSessionActive ? 'bg-rose-50' : 'bg-indigo-50 hover:bg-indigo-100'}`}
                          >
                            {isSessionActive && (
                              <div className="absolute inset-0 rounded-full border-4 border-rose-500 opacity-20 animate-ping"></div>
                            )}
                            <div className={`flex flex-col items-center justify-center w-32 h-32 rounded-full shadow-lg transition-colors ${isSessionActive ? 'bg-rose-500 hover:bg-rose-600' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
                              {isSessionActive ? (
                                <>
                                  <div className="w-8 h-8 rounded-sm bg-white mb-2"></div>
                                  <span className="text-white font-semibold text-sm">End Session</span>
                                </>
                              ) : (
                                <>
                                  <Play className="w-8 h-8 text-white mb-2 ml-1" />
                                  <span className="text-white font-semibold text-sm">Start Live</span>
                                </>
                              )}
                            </div>
                          </button>
                        </div>
                      </div>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Weekly Chart */}
                      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="text-base font-semibold text-slate-800 mb-4">Weekly Attendance</h3>
                        <div className="h-60 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={weeklyAttendanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                              <RechartsTooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                              <Bar dataKey="present" name="Present %" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={32} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Punctuality Chart */}
                      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                        <h3 className="text-base font-semibold text-slate-800 mb-2">Punctuality Breakdown</h3>
                        <div className="flex-1 h-52 w-full relative">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={punctualityData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                              >
                                {punctualityData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <RechartsTooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                            </PieChart>
                          </ResponsiveContainer>
                          {/* Center text for Donut */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-2xl font-bold text-slate-800">75%</span>
                            <span className="text-xs text-slate-500">On Time</span>
                          </div>
                        </div>
                        <div className="flex justify-center gap-4 mt-2">
                          {punctualityData.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                              {item.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <section>
                      <h3 className="text-sm font-semibold text-slate-800 mb-3 uppercase tracking-wider">System Pipeline Health</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Webcam Status */}
                        <div className="bg-white rounded-xl p-4 border border-slate-200 flex items-center gap-4">
                          <div className="p-2.5 bg-slate-50 rounded-lg text-slate-600 border border-slate-100">
                            <Video className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-semibold text-slate-800">Local Camera</p>
                              <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">1080p @ 30 FPS</p>
                          </div>
                        </div>
                        {/* Vision Service */}
                        <div className="bg-white rounded-xl p-4 border border-slate-200 flex items-center gap-4">
                          <div className="p-2.5 bg-slate-50 rounded-lg text-slate-600 border border-slate-100">
                            <Server className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-semibold text-slate-800">Vision Worker</p>
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">Queue: 0 backlog</p>
                          </div>
                        </div>
                        {/* DB Status */}
                        <div className="bg-white rounded-xl p-4 border border-slate-200 flex items-center gap-4">
                          <div className="p-2.5 bg-slate-50 rounded-lg text-slate-600 border border-slate-100">
                            <Database className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-semibold text-slate-800">Vector DB</p>
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">4,900 vectors (FAISS)</p>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>

                  <div className="space-y-6">
                    {/* Live Recognition Stream */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[500px]">
                      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                        <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
                          <span className="relative flex h-3 w-3">
                            {isSessionActive && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
                            <span className={`relative inline-flex rounded-full h-3 w-3 ${isSessionActive ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
                          </span>
                          Live Feed Stream
                        </h3>
                        <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
                          Auto-scroll
                        </span>
                      </div>
                      
                      <div className="flex-1 overflow-y-auto p-4 space-y-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300">
                        {liveStream.map((item) => (
                          <div key={item.id} className="bg-slate-50 border border-slate-100 rounded-lg p-3 hover:shadow-sm transition-all animate-in slide-in-from-top-2 fade-in duration-300">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <p className={`text-sm font-semibold ${item.status === 'spoof' ? 'text-rose-600' : 'text-slate-800'}`}>
                                  {item.name}
                                </p>
                                <p className="text-xs text-slate-500">{item.studentId}</p>
                              </div>
                              <span className="text-[10px] font-medium text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-100">
                                {item.time}
                              </span>
                            </div>
                            
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center">
                                {/* Thumbnails placeholder */}
                                <div className="flex -space-x-2">
                                  <div className="w-8 h-8 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center overflow-hidden">
                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.studentId}E`} alt="Enrolled" className="w-full h-full object-cover" />
                                  </div>
                                  <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden relative">
                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.studentId}L`} alt="Live" className="w-full h-full object-cover opacity-80" />
                                    <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay"></div>
                                  </div>
                                </div>
                                <div className="ml-3 flex flex-col">
                                  <span className="text-xs font-semibold text-slate-700">{item.matchScore}% Match</span>
                                  {item.status === 'pass' ? (
                                    <span className="text-[10px] flex items-center gap-1 text-emerald-600 font-medium">
                                      <ShieldCheck className="w-3 h-3" /> Liveness Pass
                                    </span>
                                  ) : (
                                    <span className="text-[10px] flex items-center gap-1 text-rose-600 font-medium">
                                      <ShieldAlert className="w-3 h-3" /> Spoof Blocked
                                    </span>
                                  )}
                                </div>
                              </div>
                              
                              <div>
                                {item.status === 'pass' ? (
                                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                ) : (
                                  <XCircle className="w-5 h-5 text-rose-500" />
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                        {!isSessionActive && (
                          <div className="h-full w-full flex flex-col items-center justify-center text-slate-400 py-10">
                            <Video className="w-10 h-10 mb-2 opacity-50" />
                            <p className="text-sm font-medium">Start session to view live feed</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Low Attendance Warning */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-500" />
                          Low Attendance Risk
                        </h3>
                        <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700">View All</button>
                      </div>
                      <div className="space-y-3">
                        {lowAttendanceStudents.map((student) => (
                          <div key={student.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-semibold text-xs border border-slate-200">
                                {student.name.charAt(0)}
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-slate-700">{student.name}</p>
                                <p className="text-xs text-slate-500">{student.id} • {student.course}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`text-sm font-bold ${student.percentage < 70 ? 'text-rose-600' : 'text-amber-600'}`}>
                                {student.percentage}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </>
            )}

            {/* ========================================= */}
            {/*          CLASS SCHEDULE VIEW              */}
            {/* ========================================= */}
            {activePage === 'Class Schedule' && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 animate-in fade-in duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-800">Class Schedule</h2>
                  <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
                    <Plus className="w-4 h-4" />
                    Add Class
                  </button>
                </div>
                
                {/* Placeholder for your actual schedule component */}
                <div className="text-slate-500 text-center py-20 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 flex flex-col items-center justify-center">
                  <Calendar className="w-12 h-12 text-slate-300 mb-4" />
                  <p className="text-lg font-medium text-slate-600">Your schedule will appear here</p>
                  <p className="text-sm mt-1">You can build your grid, list, or calendar component in this block.</p>
                </div>
              </div>
            )}

            {/* Placeholder for other empty pages so they don't appear blank */}
            {['Student Directory', 'Reports & Logs', 'System Settings'].includes(activePage) && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 animate-in fade-in duration-300">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">{activePage}</h2>
                <div className="text-slate-500 text-center py-20 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                  <p className="text-lg font-medium text-slate-600">{activePage} Content coming soon...</p>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}

// NEW: Updated NavItem component to handle clicks
function NavItem({ icon: Icon, label, active, onClick }) {
  return (
    <a 
      href="#" 
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick();
      }}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
        active 
          ? 'bg-indigo-50 text-indigo-700' 
          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      <Icon className={`w-5 h-5 ${active ? 'text-indigo-600' : 'text-slate-400'}`} />
      {label}
    </a>
  );
}