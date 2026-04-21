import React, { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, Copy, Download, BookOpen, MessageCircleMore, CalendarDays } from 'lucide-react';

const urgencyHooks = ['限时整理', '新学期必备', '老师都在存', '本周高需求', '临时上课救急'];
const trustHooks = ['真实老师反馈好用', '原创非拼凑模板', '已帮很多老师省时间', '课堂实测顺畅', '直接拿去能上课'];

const titleHooks = [
  '老师都在找的高颜值课件模板，直接拿去上课',
  '还在熬夜做PPT？这套原创课件帮你省下2小时',
  '公开课/班会课必备，这套PPT老师反馈太值了',
  '新学期备课别乱找，这套课件直接解决内容焦虑',
  '会做课件的不一定赢，会选课件的老师更轻松'
];

const coverHooks = [
  '直接套用',
  '高点击公式',
  '拿去就能发',
  '适合新手',
  '能引流能成交'
];

const openingHooks = [
  '很多老师每天最缺的不是能力，而是时间。',
  '备课到深夜，是很多老师的真实日常。',
  '如果有现成高质量课件，你愿不愿意直接用？',
  '老师真正需要的，不是更多素材，而是可直接上课的成品。',
  '新学期最怕临时要上课，这时候一套好课件太重要了。'
];

const imageCaptions = ['第一页先抓眼球，展示高颜值封面页', '第二页展示目录结构，让老师感知内容完整', '第三页展示课堂互动页，体现实用性', '第四页展示重点知识页，体现专业度', '第五页展示结尾页，引导收藏咨询'];

const commentHooks = [
  '评论区回复“课件”，发你目录预览',
  '想看实拍页面效果，评论区扣“想看”',
  '需要同主题课件的老师，留言你的年级',
  '评论区留“模板”，发你试看版',
  '想要完整套装，评论区回复“要”'
];

function makeResults(track, user, style, count) {
  return Array.from({ length: count }, (_, i) => ({

    title: `${urgencyHooks[i % urgencyHooks.length]}｜${track}${titleHooks[i % titleHooks.length]}`,
    coverTitle: `${track}｜${coverHooks[i % coverHooks.length]}｜${trustHooks[i % trustHooks.length]}`,
    pain: `${user}备课时间紧、临时要上课、不会设计排版、想直接使用高质量原创课件`,
    angle: style === '情绪共鸣'
      ? '展示老师辛苦备课场景 + 给出省时解决方案 + 引导查看课件'
      : style === '高转化成交'
      ? '直接展示课件效果 + 强调节省时间 + 引导领取预览'
      : '展示真实课件页面 + 使用场景说明 + 突出原创高质量',
    opening: openingHooks[i % openingHooks.length],
    body: '很多老师下班后还在赶课件，其实高效备课不一定要自己从零做。这里整理了一套原创课件，可直接用于课堂/班会/家长会。页面清晰、互动完整、拿到即可使用。适合想省时间又想保证课堂效果的老师。',
    product: '原创PPT课件 / 班会课件 / 家长会课件 / 节日主题课件',
    comment: commentHooks[i % commentHooks.length],
    cta: '现在私信或评论即可领取预览，合适再决定是否入手，无压力。',
    scarcity: '同主题课件更新频繁，建议先收藏避免后面找不到。',
    platform: '小红书',
    imagePlan: `配图建议：1）课件封面图 2）目录页 3）重点内容页 4）互动设计页 5）结尾页
每张图配文：${imageCaptions[i % imageCaptions.length]}`
  }));
}

export default function App() {
  const [track, setTrack] = useState('家长会PPT');
  const [user, setUser] = useState('小学老师');
  const [style, setStyle] = useState('实用干货');
  const [count, setCount] = useState('10');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const generate = () => {
    setLoading(true);
    setTimeout(() => {
      setItems(makeResults(track, user, style, Number(count)));
      setLoading(false);
    }, 700);
  };

  const allText = useMemo(
    () =>
      items
        .map(
          (x, i) =>
            `${i + 1}. 选题标题：${x.title}\n封面标题：${x.coverTitle}\n用户痛点：${x.pain}\n内容切入：${x.angle}\n开头钩子：${x.opening}\n完整内容文案：${x.body}\n产品形式：${x.product}\n评论区引导：${x.comment}\n成交引导：${x.cta}
稀缺提示：${x.scarcity}
实拍图方案：${x.imagePlan}
平台：${x.platform}`
        )
        .join('\n\n'),
    [items]
  );

  const copyAll = async () => navigator.clipboard.writeText(allText);

  const contentCalendar = useMemo(() => Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    theme: `${track} 第${i + 1}天带货内容`,
    type: i % 3 === 0 ? '实拍展示' : i % 3 === 1 ? '老师痛点' : '成交促单',
    title: `${track}${titleHooks[i % titleHooks.length]}`,
    action: i % 2 === 0 ? '引导评论领取预览' : '引导私信咨询'
  })), [track]);

  return (
    <div className='min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 p-4 md:p-8'>
      <div className='max-w-6xl mx-auto space-y-8'>
        <Card className='rounded-[28px] border border-white/60 shadow-xl backdrop-blur bg-white/90'>
          <CardContent className='p-6 md:p-12 space-y-8'>
            <div className='text-center space-y-3'>
              <div className='inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-1 text-sm text-rose-600'>
                <BookOpen size={16} /> 小红书专用版
              </div>
              <h1 className='text-4xl md:text-6xl font-bold tracking-tight leading-tight'>课件销售小红书内容生成器</h1>
              <p className='text-slate-500 text-sm md:text-lg max-w-2xl mx-auto'>
                帮销售原创PPT课件的商家，快速生成吸引老师购买的小红书内容
              </p>
            </div>

            <div className='grid md:grid-cols-2 gap-5'>
              <Input value={track} onChange={(e) => setTrack(e.target.value)} placeholder='你的产品，例如：家长会PPT / 班会课件 / 航天日课件' />
              <Input value={user} onChange={(e) => setUser(e.target.value)} placeholder='目标用户，例如：小学老师 / 班主任 / 培训老师' />
              <select value={style} onChange={(e) => setStyle(e.target.value)} className='h-11 w-full rounded-2xl border border-slate-200 bg-white px-3 text-sm outline-none'>
                <option value='实用干货'>实用干货</option>
                <option value='情绪共鸣'>情绪共鸣</option>
                <option value='高转化成交'>高转化成交</option>
              </select>
              <select value={count} onChange={(e) => setCount(e.target.value)} className='h-11 w-full rounded-2xl border border-slate-200 bg-white px-3 text-sm outline-none'>
                <option value='10'>10条</option>
                <option value='20'>20条</option>
                <option value='30'>30条</option>
              </select>
            </div>

            <div className='grid md:grid-cols-3 gap-4'>
              <Card className='rounded-3xl bg-white shadow-sm border-slate-100 hover:shadow-md transition-shadow'>
                <CardContent className='p-4 text-sm text-slate-600'>
                  输出封面标题，解决“不知道封面写什么”
                </CardContent>
              </Card>
              <Card className='rounded-2xl bg-white/70 shadow-none border-slate-200'>
                <CardContent className='p-4 text-sm text-slate-600'>
                  输出课件实拍图顺序，解决“用户滑走不看图”
                </CardContent>
              </Card>
              <Card className='rounded-2xl bg-white/70 shadow-none border-slate-200'>
                <CardContent className='p-4 text-sm text-slate-600'>
                  输出成交话术，解决“有流量没转化”
                </CardContent>
              </Card>
            </div>

            <Button onClick={generate} className='w-full rounded-2xl h-14 text-base shadow-lg hover:shadow-xl transition-all'>
              {loading ? '生成中...' : <span className='flex items-center gap-2'><Sparkles size={18} />立即生成小红书内容</span>}
            </Button>
          </CardContent>
        </Card>

        {items.length > 0 && (
          <div className='space-y-4'>
            <div className='flex items-center justify-between gap-3 flex-wrap'>
              <h2 className='text-xl font-semibold'>已生成 {items.length} 条吸引老师购买的小红书内容</h2>
              <div className='flex gap-2 flex-wrap'>
                <Button variant='outline' onClick={copyAll} className='rounded-2xl'>
                  <Copy className='mr-2 h-4 w-4' />复制全部结果
                </Button>
                <Button variant='outline' className='rounded-2xl'>
                  <Download className='mr-2 h-4 w-4' />导出文档
                </Button>
              </div>
            </div>

            <Card className='rounded-3xl border border-white/70 shadow-lg'>
              <CardContent className='p-6 space-y-4'>
                <div className='flex items-center gap-2 text-xl font-semibold'><CalendarDays size={20}/>30天持续带货内容日历</div>
                <div className='grid md:grid-cols-2 gap-3'>
                  {contentCalendar.map((d) => (
                    <div key={d.day} className='rounded-2xl border border-slate-100 bg-slate-50 p-4'>
                      <div className='text-sm text-slate-500'>Day {d.day} · {d.type}</div>
                      <div className='font-medium mt-1'>{d.title}</div>
                      <div className='text-sm text-slate-600 mt-2'>动作：{d.action}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className='grid gap-4'>
              {items.map((x, i) => (
                <Card key={i} className='rounded-3xl border border-white/70 shadow-lg hover:shadow-xl transition-all'>
                  <CardContent className='p-6 md:p-7 space-y-5'>
                    <div className='space-y-2'>
                      <div className='text-lg font-semibold'>{i + 1}. {x.title}</div>
                      <div className='inline-block rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600'>封面标题：{x.coverTitle}</div>
                    </div>

                    <div className='grid md:grid-cols-2 gap-3 text-sm md:text-[15px]'>
                      <div><span className='font-medium text-slate-900'>用户痛点：</span>{x.pain}</div>
                      <div><span className='font-medium text-slate-900'>内容切入：</span>{x.angle}</div>
                      <div><span className='font-medium text-slate-900'>开头钩子：</span>{x.opening}</div>
                      <div><span className='font-medium text-slate-900'>产品形式：</span>{x.product}</div>
                    </div>

                    <div className='rounded-3xl bg-slate-50/80 p-5 text-sm md:text-[15px] border border-slate-100'>
                      <div className='font-medium mb-2'>图文笔记正文</div>
                      <div className='text-slate-700'>{x.body}</div><div className='mt-3 text-slate-600 whitespace-pre-line text-sm'>{x.imagePlan}</div>
                    </div>

                    <div className='flex items-start gap-2 rounded-3xl bg-rose-50 p-5 text-sm md:text-[15px] text-rose-700 border border-rose-100'>
                      <MessageCircleMore size={18} className='mt-0.5 shrink-0' />
                      <div className='space-y-2'><div><span className='font-medium'>评论区引导：</span>{x.comment}</div><div><span className='font-medium'>成交引导：</span>{x.cta}</div><div><span className='font-medium'>稀缺提示：</span>{x.scarcity}</div></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
