import React, { useState } from 'react';

const userSample = {
  name: '周先生',
  credit: 750,
  pointsTotal: 4820,
  pointsToday: 120,
};

const sampleTasks = [
  { id: 1, title: '核对3月-5月团队餐饮流水', status: 'pending', reward: 30, detail: '核对发票与明细' },
  { id: 2, title: '提交上周出差交通费流水', status: 'done', reward: 50, detail: '上传发票照片' },
  { id: 3, title: '核对3月-4月差旅发票', status: 'pending', reward: 40, detail: '核对金额与报销科目' },
  { id: 4, title: '确认客户招待费汇总', status: 'pending', reward: 60, detail: '整合招待清单' },
  { id: 5, title: '更新团队成员报销名单', status: 'done', reward: 20, detail: '新增张三的账户' },
];

const sampleFlows = [
  { id: 1, type: 'new', user: '王五', amount: -168.0, note: '滴滴出行', tag: '待认领' },
  { id: 2, type: 'done', user: '李四', amount: 0, note: '办公用品采购', tag: '+50积分' },
  { id: 3, type: 'task', user: '系统', amount: 0, note: '新任务：客户招待费汇总', tag: '待处理' },
  { id: 4, type: 'new', user: '赵六', amount: -45.5, note: '早餐费用', tag: '待认领' },
];

function TopBoard({ user }) {
  return (
    <div className="px-5 pt-5 pb-4 bg-gradient-to-r from-primary to-blue-600 text-white">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm opacity-90">下午好，<span className="font-semibold">{user.name}</span></div>
          <div className="mt-2 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="text-xs opacity-90">信用分</div>
              <div className="font-semibold">{user.credit}</div>
            </div>
            <div className="flex-1">
              <div className="w-full bg-white/20 rounded-lg h-2 overflow-hidden">
                <div style={{ width: `${(user.credit / 1000) * 100}%` }} className="h-2 bg-success" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-xs opacity-90">总积分</div>
          <div className="font-bold text-2xl">{user.pointsTotal}</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="bg-white/10 rounded-xl p-4 flex flex-col gap-1">
          <div className="text-xs opacity-90">我的总积分</div>
          <div className="text-lg font-semibold">{user.pointsTotal}</div>
        </div>
        <div className="bg-white/10 rounded-xl p-4 flex flex-col gap-1 items-end">
          <div className="text-xs opacity-90">今日获得积分</div>
          <div className="text-lg font-semibold flex items-center gap-2 text-success">
            ↑ +{user.pointsToday}
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <button className="flex-1 bg-success text-white py-3 rounded-xl font-semibold">发布流水任务</button>
        <button className="px-4 py-3 bg-white/10 rounded-xl text-white">积分兑换</button>
      </div>
    </div>
  );
}

function Home({ user, tasks, flows, onOpenTask }) {
  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-4 gap-3 bg-white p-3 rounded-xl shadow-sm">
        {['支付宝流水','流水任务','团队','积分流水','今日任务','公告','报表','审批'].map((item,i)=>(
          <div key={i} className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">🌐</div>
            <div className="text-xs">{item}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="font-semibold">最新公告</div>
            <div className="w-2 h-2 bg-red-500 rounded-full" />
          </div>
          <div className="text-sm text-primary">查看全部</div>
        </div>
        <div className="mt-3 text-sm text-gray-600">
          关于新的报销流程通知：自 2025-11-01 起，差旅报销提交将启用线上表单，请在出差结束后 3 个工作日内提交。
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="font-semibold">今日任务 <span className="text-sm text-gray-500">(2/5)</span></div>
          <div className="text-sm text-primary">加载更多任务</div>
        </div>

        <div className="mt-3 space-y-3">
          {tasks.slice(0,3).map(t=>(
            <div key={t.id} className="flex items-center justify-between">
              <div>
                <div className="font-medium">{t.title}</div>
                <div className="text-xs text-gray-500">奖励：+{t.reward}积分</div>
              </div>
              <div className="flex flex-col items-end gap-2">
                {t.status === 'done' ? (
                  <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs flex items-center gap-1">✓ 已完成</div>
                ) : (
                  <div className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs">未完成</div>
                )}
                <button className={`text-xs px-3 py-1 rounded-lg ${t.status === 'done' ? 'bg-gray-100 text-gray-400' : 'bg-primary text-white'}`} onClick={()=>onOpenTask(t)}>
                  {t.status === 'done' ? '已完成' : '去完成'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="font-semibold">流水动态</div>
          <div className="text-sm text-primary">查看全部流水</div>
        </div>

        <div className="mt-3 space-y-2 text-sm text-gray-700">
          {flows.map(f=>(
            <div key={f.id} className="flex items-center justify-between">
              <div>
                <div className="font-medium">
                  {f.type === 'new' ? '[新流水]' : f.type === 'done' ? '[任务完成]' : '[新任务]'} {f.user} {f.amount !== 0 ? `${f.amount < 0 ? '¥' + Math.abs(f.amount).toFixed(2) : ''}` : ''}
                </div>
                <div className="text-xs text-gray-500">{f.note}</div>
              </div>
              <div className={`text-xs px-2 py-1 rounded-full ${f.tag.includes('待') ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>{f.tag}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TasksPage({ tasks, onBack, onOpenTask }) {
  return (
    <div className="p-6 overflow-auto h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="text-lg font-semibold">任务列表</div>
        <button onClick={onBack} className="text-sm text-gray-500">关闭</button>
      </div>

      <div className="space-y-3">
        {tasks.map(t=>(
          <div key={t.id} className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm">
            <div>
              <div className="font-medium">{t.title}</div>
              <div className="text-xs text-gray-500">{t.detail}</div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className={`px-3 py-1 rounded-full text-xs ${t.status === 'done' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {t.status === 'done' ? '已完成' : '未完成'}
              </div>
              <div className="text-xs">{t.reward} 积分</div>
              <button className={`px-3 py-1 rounded-lg text-xs ${t.status === 'done' ? 'bg-gray-100 text-gray-400' : 'bg-primary text-white'}`} onClick={()=>onOpenTask(t)}>
                {t.status === 'done' ? '查看' : '去完成'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FlowsPage({ flows, onBack }) {
  return (
    <div className="p-6 overflow-auto h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="text-lg font-semibold">流水详情</div>
        <button onClick={onBack} className="text-sm text-gray-500">关闭</button>
      </div>

      <div className="space-y-3">
        {flows.map(f=>(
          <div key={f.id} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{f.user} {f.amount !== 0 ? (f.amount < 0 ? `支出 ¥${Math.abs(f.amount).toFixed(2)}` : `收入 ¥${f.amount.toFixed(2)}`) : ''}</div>
                <div className="text-xs text-gray-500">{f.note}</div>
              </div>
              <div className={`text-xs px-2 py-1 rounded-full ${f.tag.includes('待') ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>{f.tag}</div>
            </div>
            <div className="mt-3 text-xs text-gray-600">操作：<button className="text-primary">认领</button> · <button className="text-primary">发布任务</button></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeamPlaceholder({ onBack }) {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-lg font-semibold">团队</div>
        <button onClick={onBack} className="text-sm text-gray-500">关闭</button>
      </div>
      <div className="bg-white rounded-xl p-4 shadow-sm">团队功能占位页</div>
    </div>
  );
}

function MePlaceholder({ user, onBack }) {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-lg font-semibold">个人中心</div>
        <button onClick={onBack} className="text-sm text-gray-500">关闭</button>
      </div>
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="text-sm text-gray-500">用户名</div>
        <div className="font-medium mb-2">{user.name}</div>
        <div className="text-sm text-gray-500">信用分</div>
        <div className="font-medium mb-2">{user.credit}</div>
        <div className="text-sm text-gray-500">积分总览</div>
        <div className="font-medium">总积分 {user.pointsTotal} · 今日 +{user.pointsToday}</div>
      </div>
    </div>
  );
}

function BottomNav({ active, onChange }) {
  const items = [
    { id: 'home', label: '首页', icon: '🏠' },
    { id: 'tasks', label: '任务', icon: '🧾' },
    { id: 'flows', label: '流水', icon: '💰' },
    { id: 'team', label: '团队', icon: '👥' },
    { id: 'me', label: '我的', icon: '👤' },
  ];
  return (
    <div className="bg-white border-t flex justify-around py-3">
      {items.map(it => (
        <button key={it.id} onClick={()=>onChange(it.id)} className={`flex flex-col items-center text-sm ${active === it.id ? 'text-primary font-semibold' : 'text-gray-500'}`}>
          <div className="text-lg">{it.icon}</div>
          <div>{it.label}</div>
        </button>
      ))}
    </div>
  );
}

export default function App() {
  const [route, setRoute] = useState('home');
  const [user] = useState(userSample);
  const [tasks] = useState(sampleTasks);
  const [flows] = useState(sampleFlows);
  const [activeTask, setActiveTask] = useState(null);

  return (
    <div className="w-[390px] h-[844px] bg-gray-100 rounded-3xl shadow-xl overflow-hidden flex flex-col">
      <TopBoard user={user} />

      <div className="flex-1 relative">
        {/* Page containers with simple translate animation */}
        <div className={`absolute inset-0 transition-transform duration-300 ${route === 'home' ? 'translate-x-0' : route === 'tasks' ? '-translate-x-full' : route === 'flows' ? 'translate-x-full' : 'translate-x-0'}`}>
          <Home user={user} tasks={tasks} flows={flows} onOpenTask={(t)=>setActiveTask(t)} />
        </div>

        <div className={`absolute inset-0 transition-transform duration-300 ${route === 'tasks' ? 'translate-x-0' : route === 'home' ? 'translate-x-full' : 'translate-x-0'}`}>
          <TasksPage tasks={tasks} onBack={()=>setRoute('home')} onOpenTask={(t)=>setActiveTask(t)} />
        </div>

        <div className={`absolute inset-0 transition-transform duration-300 ${route === 'flows' ? 'translate-x-0' : 'translate-x-full'}`}>
          <FlowsPage flows={flows} onBack={()=>setRoute('home')} />
        </div>

        <div className={`absolute inset-0 transition-transform duration-300 ${route === 'team' ? 'translate-x-0' : 'translate-x-full'}`}>
          <TeamPlaceholder onBack={()=>setRoute('home')} />
        </div>

        <div className={`absolute inset-0 transition-transform duration-300 ${route === 'me' ? 'translate-x-0' : 'translate-x-full'}`}>
          <MePlaceholder user={user} onBack={()=>setRoute('home')} />
        </div>

        {/* Active task modal */}
        {activeTask && (
          <div className="absolute inset-0 bg-black/30 flex items-end">
            <div className="bg-white w-full rounded-t-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="font-semibold">{activeTask.title}</div>
                <button className="text-sm text-gray-500" onClick={()=>setActiveTask(null)}>关闭</button>
              </div>
              <div className="text-sm text-gray-600 mb-4">{activeTask.detail}</div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">奖励</div>
                <div className="font-semibold">+{activeTask.reward} 积分</div>
              </div>
              <div className="mt-4">
                <button className="w-full bg-primary text-white py-3 rounded-xl">去完成</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <BottomNav active={route} onChange={setRoute} />
    </div>
  );
}
