import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, 
  Camera, 
  Atom, 
  Search, 
  ChevronRight, 
  FlaskConical, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  History,
  Menu,
  X,
  Loader2,
  Share2,
  Download
} from 'lucide-react';

// 模拟的 AI 分析结果数据
const MOCK_RESULT = {
  reactionName: "Friedel-Crafts 酰基化反应 (Friedel-Crafts Acylation)",
  confidence: 98.5,
  summary: "该反应展示了苯与乙酰氯在无水三氯化铝催化下生成苯乙酮的过程。属于亲电芳香取代反应。",
  equation: "C6H6 + CH3COCl → C6H5COCH3 + HCl",
  conditions: ["催化剂: AlCl3 (无水)", "溶剂: 硝基苯 或 CS2", "温度: 60°C"],
  mechanismSteps: [
    {
      step: 1,
      title: "亲电试剂的生成",
      desc: "乙酰氯与路易斯酸 AlCl3 反应，生成酰基正离子 (CH3-C+=O)。这是反应中的活性亲电物种。",
      type: "activation"
    },
    {
      step: 2,
      title: "亲电进攻",
      desc: "酰基正离子进攻苯环，打破苯环的芳香性，形成共振稳定的 σ-络合物 (Wheland 中间体)。",
      type: "attack"
    },
    {
      step: 3,
      title: "去质子化与芳香性恢复",
      desc: "AlCl4- 作为碱夺取中间体上的质子，恢复苯环的芳香性，生成酮与 HCl，并再生催化剂。",
      type: "restoration"
    }
  ],
  hazards: ["AlCl3 遇水剧烈反应", "HCl 气体有腐蚀性"],
  similarReactions: ["Friedel-Crafts 烷基化", "Gattermann-Koch 反应"]
};

// 简单的 UI 组件
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, type = "neutral" }) => {
  const styles = {
    neutral: "bg-slate-100 text-slate-600",
    success: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    warning: "bg-amber-50 text-amber-600 border border-amber-100",
    primary: "bg-blue-50 text-blue-600 border border-blue-100",
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[type]}`}>
      {children}
    </span>
  );
};

export default function OrganicAIPlatform() {
  const [image, setImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const fileInputRef = useRef(null);

  // 处理文件上传
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
        setResult(null); // 重置结果
      };
      reader.readAsDataURL(file);
    }
  };

  // 处理拖拽
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  const handleDragLeave = () => setIsDragOver(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  // 模拟 AI 分析过程
  const startAnalysis = () => {
    if (!image) return;
    setIsAnalyzing(true);
    
    // 模拟 2.5秒 的 API 延迟
    setTimeout(() => {
      setIsAnalyzing(false);
      setResult(MOCK_RESULT);
    }, 2500);
  };

  const reset = () => {
    setImage(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-indigo-100">
      {/* 顶部导航栏 */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2 cursor-pointer" onClick={reset}>
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                <Atom size={20} />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                有机
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
              <a href="#" className="hover:text-indigo-600 transition-colors">反应库</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">机理教学</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">API文档</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">关于我们</a>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <button className="p-2 text-slate-400 hover:text-slate-600">
                <History size={20} />
              </button>
              <div className="w-8 h-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-xs">
                USER
              </div>
            </div>

            <button 
              className="md:hidden p-2 text-slate-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* 移动端菜单 */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 absolute w-full px-4 py-4 space-y-3 shadow-lg">
            <a href="#" className="block py-2 font-medium text-slate-600">反应库</a>
            <a href="#" className="block py-2 font-medium text-slate-600">机理教学</a>
            <a href="#" className="block py-2 font-medium text-slate-600">历史记录</a>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* 如果没有结果，显示上传/欢迎区域 */}
        {!result && !isAnalyzing && (
          <div className="flex flex-col items-center justify-center min-h-[70vh] transition-all">
            <div className="text-center max-w-2xl mb-10">
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                瞬间解析 <span className="text-indigo-600">有机合成</span> 路径
              </h1>
              <p className="text-lg text-slate-500">
                上传反应式图片或直接拍照，AI 引擎将在几秒钟内为您推断反应机理、产物及合成路线。
                专为化学研究人员与学生打造。
              </p>
            </div>

            {/* 上传区域 */}
            <div className="w-full max-w-xl">
              {!image ? (
                <div 
                  className={`
                    relative group border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center cursor-pointer transition-all duration-300
                    ${isDragOver ? 'border-indigo-500 bg-indigo-50 scale-[1.02]' : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50 bg-white'}
                  `}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-colors">
                    <Upload className="text-indigo-600" size={32} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-700 mb-2">点击或拖拽上传图片</h3>
                  <p className="text-sm text-slate-400 text-center mb-6">
                    支持 JPG, PNG, HEIC 格式<br/>建议图片清晰包含反应物与试剂
                  </p>
                  
                  <div className="flex gap-3 w-full">
                    <button 
                      className="flex-1 py-2.5 px-4 bg-white border border-slate-200 rounded-xl text-slate-600 font-medium hover:bg-slate-50 flex items-center justify-center gap-2 shadow-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        // 实际开发中这里调用摄像头API
                        alert("在此原型中，请直接使用文件选择模拟拍照");
                        fileInputRef.current?.click();
                      }}
                    >
                      <Camera size={18} />
                      拍照识别
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white p-4 rounded-3xl shadow-lg border border-slate-100">
                  <div className="relative rounded-2xl overflow-hidden mb-4 bg-slate-100 max-h-80 flex items-center justify-center">
                    <img src={image} alt="Preview" className="w-full h-full object-contain" />
                    <button 
                      onClick={reset}
                      className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70 backdrop-blur-sm"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <button 
                    onClick={startAnalysis}
                    className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                  >
                    <Search size={20} />
                    开始智能分析
                  </button>
                </div>
              )}

              {/* 功能提示 */}
              {!image && (
                <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                  {[
                    { icon: <CheckCircle2 size={18} />, text: "99% 识别率" },
                    { icon: <FlaskConical size={18} />, text: "详细机理" },
                    { icon: <FileText size={18} />, text: "文献引用" },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 text-slate-400">
                      <div className="text-indigo-500">{item.icon}</div>
                      <span className="text-xs font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 分析加载状态 */}
        {isAnalyzing && (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Atom className="text-indigo-600 animate-pulse" size={24} />
              </div>
            </div>
            <h2 className="mt-8 text-xl font-bold text-slate-800">正在解析分子结构...</h2>
            <p className="text-slate-500 mt-2 animate-pulse">比对 12,000,000+ 条反应数据库</p>
          </div>
        )}

        {/* 结果展示页面 */}
        {result && !isAnalyzing && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
            {/* 头部：反应概览 */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <button onClick={reset} className="text-slate-400 hover:text-indigo-600 flex items-center gap-1 text-sm">
                    <History size={14} /> 重新上传
                  </button>
                  <span className="text-slate-300">|</span>
                  <Badge type="success">置信度 {result.confidence}%</Badge>
                </div>
                <h1 className="text-3xl font-bold text-slate-900">{result.reactionName}</h1>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 text-sm font-medium hover:bg-slate-50 flex items-center gap-2">
                  <Share2 size={16} /> 分享
                </button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2 shadow-sm">
                  <Download size={16} /> 导出报告
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* 左侧：主内容 */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* 反应方程式卡片 */}
                <Card className="p-6 bg-gradient-to-br from-white to-indigo-50/30">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <FlaskConical size={16} /> 总反应式
                  </h3>
                  <div className="p-6 bg-white rounded-xl border border-slate-200 flex items-center justify-center overflow-x-auto">
                    {/* 这里通常会渲染 LaTeX 或 SMILES 图像，这里用文字模拟 */}
                    <span className="text-xl md:text-2xl font-serif text-slate-800 tracking-wide whitespace-nowrap">
                      {result.equation}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {result.conditions.map((cond, i) => (
                      <span key={i} className="px-3 py-1 bg-white border border-slate-200 rounded-md text-xs text-slate-600 shadow-sm">
                        {cond}
                      </span>
                    ))}
                  </div>
                </Card>

                {/* 反应机理详解 */}
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <FileText size={20} className="text-indigo-600" />
                    反应机理推断
                  </h2>
                  
                  {result.mechanismSteps.map((step, index) => (
                    <Card key={index} className="flex flex-col md:flex-row p-0 overflow-hidden group">
                      <div className="bg-slate-50 p-6 md:w-24 flex-shrink-0 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-100">
                        <span className="text-2xl font-bold text-slate-300 group-hover:text-indigo-400 transition-colors">
                          {String(step.step).padStart(2, '0')}
                        </span>
                      </div>
                      <div className="p-6 flex-grow">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-slate-800">{step.title}</h3>
                          <Badge type={step.type === 'attack' ? 'warning' : 'neutral'}>
                            {step.type === 'activation' ? '活化' : step.type === 'attack' ? '进攻' : '消除'}
                          </Badge>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                      {/* 这里可以放步骤的微缩图 */}
                      <div className="hidden md:flex w-32 bg-white items-center justify-center border-l border-slate-100 p-4">
                         <div className="text-slate-200">
                           <Atom size={32} />
                         </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* 右侧：侧边栏信息 */}
              <div className="space-y-6">
                {/* 概述 */}
                <Card className="p-6">
                  <h3 className="text-sm font-bold text-slate-900 mb-3">AI 摘要</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {result.summary}
                  </p>
                </Card>

                {/* 相似反应 */}
                <Card className="p-6">
                  <h3 className="text-sm font-bold text-slate-900 mb-4">相关反应推荐</h3>
                  <div className="space-y-3">
                    {result.similarReactions.map((name, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group">
                        <span className="text-sm text-slate-600 group-hover:text-indigo-600 font-medium">{name}</span>
                        <ChevronRight size={14} className="text-slate-300 group-hover:text-indigo-400" />
                      </div>
                    ))}
                  </div>
                </Card>

                {/* 安全警示 */}
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
                  <h3 className="text-amber-800 font-bold text-sm flex items-center gap-2 mb-3">
                    <AlertCircle size={16} /> 实验安全提示
                  </h3>
                  <ul className="space-y-2">
                    {result.hazards.map((hazard, i) => (
                      <li key={i} className="text-xs text-amber-700 flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 bg-amber-400 rounded-full flex-shrink-0"></span>
                        {hazard}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 底部 */}
      <footer className="bg-white border-t border-slate-200 mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm mb-4">© 2025 有机 (ZhiHe Organic AI). All rights reserved.</p>
          <div className="flex justify-center gap-6 text-slate-400 text-sm">
            <a href="#" className="hover:text-indigo-600">隐私政策</a>
            <a href="#" className="hover:text-indigo-600">服务条款</a>
            <a href="#" className="hover:text-indigo-600">帮助中心</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
