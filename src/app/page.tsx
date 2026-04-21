'use client';

import React, { useMemo, useState } from 'react';

type ResultItem = {
  title: string;
  coverTitle: string;
  pain: string;
  angle: string;
  opening: string;
  body: string;
  product: string;
  comment: string;
  cta: string;
  scarcity: string;
  platform: string;
  imagePlan: string;
};

type CalendarItem = {
  day: number;
  theme: string;
  type: string;
  title: string;
  action: string;
};

const urgencyHooks = ['限时整理', '新学期必备', '老师都在存', '本周高需求', '临时上课救急'];
const trustHooks = ['真实老师反馈好用', '原创非拼凑模板', '已帮很多老师省时间', '课堂实测顺畅', '直接拿去能上课'];

const titleHooks = [
  '老师都在找的高颜值课件模板，直接拿去上课',
  '还在熬夜做PPT？这套原创课件帮你省下2小时',
  '公开课/班会课必备，这套PPT老师反馈太值了',
  '新学期备课别乱找，这套课件直接解决内容焦虑',
  '会做课件的不一定赢，会选课件的老师更轻松',
];

const coverHooks = ['直接套用', '高点击公式', '拿去就能发', '适合新手', '能引流能成交'];

const openingHooks = [
  '很多老师每天最缺的不是能力，而是时间。',
  '备课到深夜，是很多老师的真实日常。',
  '如果有现成高质量课件，你愿不愿意直接用？',
  '老师真正需要的，不是更多素材，而是可直接上课的成品。',
  '新学期最怕临时要上课，这时候一套好课件太重要了。',
];

const imageCaptions = [
  '第一页先抓眼球，展示高颜值封面页',
  '第二页展示目录结构，让老师感知内容完整',
  '第三页展示课堂互动页，体现实用性',
  '第四页展示重点知识页，体现专业度',
  '第五页展示结尾页，引导收藏咨询',
];

const commentHooks = [
  '评论区回复“课件”，发你目录预览',
  '想看实拍页面效果，评论区扣“想看”',
  '需要同主题课件的老师，留言你的年级',
  '评论区留“模板”，发你试看版',
  '想要完整套装，评论区回复“要”',
];

function makeResults(track: string, user: string, style: string, count: number): ResultItem[] {
  return Array.from({ length: count }, (_, i) => ({
    title: `${urgencyHooks[i % urgencyHooks.length]}｜${track}${titleHooks[i % titleHooks.length]}`,
    coverTitle: `${track}｜${coverHooks[i % coverHooks.length]}｜${trustHooks[i % trustHooks.length]}`,
    pain: `${user}备课时间紧、临时要上课、不会设计排版、想直接使用高质量原创课件`,
    angle:
      style === '情绪共鸣'
        ? '展示老师辛苦备课场景 + 给出省时解决方案 + 引导查看课件'
        : style === '高转化成交'
          ? '直接展示课件效果 + 强调节省时间 + 引导领取预览'
          : '展示真实课件页面 + 使用场景说明 + 突出原创高质量',
    opening: openingHooks[i % openingHooks.length],
    body: '很多老师下班后还在赶课件，其实高效备课不一定要自己从零做。这里整理了一套原创课件，可直接用于课堂、班会、家长会。页面清晰、互动完整、拿到即可使用。适合想省时间又想保证课堂效果的老师。',
    product: '原创PPT课件 / 班会课件 / 家长会课件 / 节日主题课件',
    comment: commentHooks[i % commentHooks.length],
    cta: '现在私信或评论即可领取预览，合适再决定是否入手，无压力。',
    scarcity: '同主题课件更新频繁，建议先收藏，避免后面找不到。',
    platform: '小红书',
    imagePlan: `配图建议：1）课件封面图 2）目录页 3）重点内容页 4）互动设计页 5）结尾页\n每张图配文：${imageCaptions[i % imageCaptions.length]}`,
  }));
}

function makeCalendar(track: string): CalendarItem[] {
  return Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    theme: `${track} 第${i + 1}天带货内容`,
    type: i % 3 === 0 ? '实拍展示' : i % 3 === 1 ? '老师痛点' : '成交促单',
    title: `${track}${titleHooks[i % titleHooks.length]}`,
    action: i % 2 === 0 ? '引导评论领取预览' : '引导私信咨询',
  }));
}

export default function Page() {
  const [track, setTrack] = useState<string>('家长会PPT');
  const [user, setUser] = useState<string>('小学老师');
  const [style, setStyle] = useState<string>('实用干货');
  const [count, setCount] = useState<string>('10');
  const [items, setItems] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const generate = () => {
    setLoading(true);
    setTimeout(() => {
      setItems(makeResults(track, user, style, Number(count)));
      setLoading(false);
    }, 500);
  };

  const allText = useMemo(() => {
    return items
      .map(
        (x, i) =>
          `${i + 1}. 选题标题：${x.title}\n封面标题：${x.coverTitle}\n用户痛点：${x.pain}\n内容切入：${x.angle}\n开头钩子：${x.opening}\n完整内容文案：${x.body}\n产品形式：${x.product}\n评论区引导：${x.comment}\n成交引导：${x.cta}\n稀缺提示：${x.scarcity}\n实拍图方案：${x.imagePlan}\n平台：${x.platform}`,
      )
      .join('\n\n');
  }, [items]);

  const contentCalendar = useMemo(() => makeCalendar(track), [track]);

  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(allText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const exportText = () => {
    const blob = new Blob([allText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${track}-小红书内容.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 p-4 md:p-8 text-slate-900">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-[28px] border border-white/60 bg-white/90 p-6 shadow-xl backdrop-blur md:p-12">
          <div className="space-y-8">
            <div className="space-y-3 text-center">
              <div className="inline-flex items-center rounded-full bg-rose-50 px-4 py-1 text-sm text-rose-600">
                小红书专用版
              </div>
              <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">课件销售小红书内容生成器</h1>
              <p className="mx-auto max-w-2xl text-sm text-slate-500 md:text-lg">
                帮销售原创 PPT 课件的商家，快速生成吸引老师购买的小红书内容
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <input
                value={track}
                onChange={(e) => setTrack(e.target.value)}
                placeholder="你的产品，例如：家长会PPT / 班会课件 / 航天日课件"
                className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-3 text-sm outline-none"
              />
              <input
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="目标用户，例如：小学老师 / 班主任 / 培训老师"
                className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-3 text-sm outline-none"
              />
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-3 text-sm outline-none"
              >
                <option value="实用干货">实用干货</option>
                <option value="情绪共鸣">情绪共鸣</option>
                <option value="高转化成交">高转化成交</option>
              </select>
              <select
                value={count}
                onChange={(e) => setCount(e.target.value)}
                className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-3 text-sm outline-none"
              >
                <option value="10">10条</option>
                <option value="20">20条</option>
                <option value="30">30条</option>
              </select>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-slate-100 bg-white p-4 text-sm text-slate-600 shadow-sm">
                输出封面标题，解决“不知道封面写什么”
              </div>
              <div className="rounded-3xl border border-slate-100 bg-white p-4 text-sm text-slate-600 shadow-sm">
                输出课件实拍图顺序，解决“用户滑走不看图”
              </div>
              <div className="rounded-3xl border border-slate-100 bg-white p-4 text-sm text-slate-600 shadow-sm">
                输出成交话术，解决“有流量没转化”
              </div>
            </div>

            <button
              onClick={generate}
              className="h-14 w-full rounded-2xl bg-slate-900 px-4 text-base text-white shadow-lg transition hover:opacity-95"
            >
              {loading ? '生成中...' : '立即生成小红书内容'}
            </button>
          </div>
        </section>

        {items.length > 0 && (
          <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-semibold">已生成 {items.length} 条吸引老师购买的小红书内容</h2>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={copyAll}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm"
                >
                  {copied ? '已复制' : '复制全部结果'}
                </button>
                <button
                  onClick={exportText}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm"
                >
                  导出文档
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-white/70 bg-white p-6 shadow-lg">
              <div className="mb-4 text-xl font-semibold">30天持续带货内容日历</div>
              <div className="grid gap-3 md:grid-cols-2">
                {contentCalendar.map((d) => (
                  <div key={d.day} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <div className="text-sm text-slate-500">
                      Day {d.day} · {d.type}
                    </div>
                    <div className="mt-1 font-medium">{d.title}</div>
                    <div className="mt-2 text-sm text-slate-600">动作：{d.action}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {items.map((x, i) => (
                <div key={i} className="rounded-3xl border border-white/70 bg-white p-6 shadow-lg md:p-7">
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <div className="text-lg font-semibold">
                        {i + 1}. {x.title}
                      </div>
                      <div className="inline-block rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                        封面标题：{x.coverTitle}
                      </div>
                    </div>

                    <div className="grid gap-3 text-sm md:grid-cols-2 md:text-[15px]">
                      <div>
                        <span className="font-medium text-slate-900">用户痛点：</span>
                        {x.pain}
                      </div>
                      <div>
                        <span className="font-medium text-slate-900">内容切入：</span>
                        {x.angle}
                      </div>
                      <div>
                        <span className="font-medium text-slate-900">开头钩子：</span>
                        {x.opening}
                      </div>
                      <div>
                        <span className="font-medium text-slate-900">产品形式：</span>
                        {x.product}
                      </div>
                    </div>

                    <div className="rounded-3xl border border-slate-100 bg-slate-50/80 p-5 text-sm md:text-[15px]">
                      <div className="mb-2 font-medium">图文笔记正文</div>
                      <div className="text-slate-700">{x.body}</div>
                      <div className="mt-3 whitespace-pre-line text-sm text-slate-600">{x.imagePlan}</div>
                    </div>

                    <div className="rounded-3xl border border-rose-100 bg-rose-50 p-5 text-sm text-rose-700 md:text-[15px]">
                      <div className="space-y-2">
                        <div>
                          <span className="font-medium">评论区引导：</span>
                          {x.comment}
                        </div>
                        <div>
                          <span className="font-medium">成交引导：</span>
                          {x.cta}
                        </div>
                        <div>
                          <span className="font-medium">稀缺提示：</span>
                          {x.scarcity}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
