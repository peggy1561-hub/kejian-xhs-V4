import { NextResponse } from 'next/server';

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

function makeMockResults(track: string, user: string, style: string, count: number): ResultItem[] {
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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const track = String(body.track || '家长会PPT');
    const user = String(body.user || '小学老师');
    const style = String(body.style || '实用干货');
    const count = Number(body.count || 10);

    const apiKey = process.env.OPENAI_API_KEY;
    const model = process.env.OPENAI_MODEL || 'gpt-4.1-mini';

    if (!apiKey) {
      return NextResponse.json({
        ok: true,
        source: 'mock',
        items: makeMockResults(track, user, style, count),
      });
    }

    const prompt = `
你是一个擅长小红书内容营销的中文文案助手。
目标：为“销售原创PPT课件”的商家，生成吸引老师购买的内容。
产品：${track}
目标用户：${user}
内容风格：${style}
数量：${count}

请返回严格 JSON 数组，不要任何 markdown，不要解释。
每一项必须包含以下字段：
title
coverTitle
pain
angle
opening
body
product
comment
cta
scarcity
platform
imagePlan

要求：
1. 内容面向会购买课件的老师，不是面向卖家同行
2. 标题要有购买吸引力，但不要夸张违规
3. body 要是完整可发的小红书正文，不要只写提纲
4. imagePlan 要给出 5 张图的展示建议
5. platform 固定写“小红书”
`;

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        input: prompt,
        text: {
          format: {
            type: 'json_schema',
            name: 'xhs_content_items',
            schema: {
              type: 'array',
              items: {
                type: 'object',
                additionalProperties: false,
                properties: {
                  title: { type: 'string' },
                  coverTitle: { type: 'string' },
                  pain: { type: 'string' },
                  angle: { type: 'string' },
                  opening: { type: 'string' },
                  body: { type: 'string' },
                  product: { type: 'string' },
                  comment: { type: 'string' },
                  cta: { type: 'string' },
                  scarcity: { type: 'string' },
                  platform: { type: 'string' },
                  imagePlan: { type: 'string' },
                },
                required: [
                  'title',
                  'coverTitle',
                  'pain',
                  'angle',
                  'opening',
                  'body',
                  'product',
                  'comment',
                  'cta',
                  'scarcity',
                  'platform',
                  'imagePlan',
                ],
              },
            },
          },
        },
      }),
    });

    if (!response.ok) {
      return NextResponse.json({
        ok: true,
        source: 'mock',
        items: makeMockResults(track, user, style, count),
        error: 'AI 接口调用失败，已切换为演示内容',
      });
    }

    const data = await response.json();
    const textOutput = data.output_text;

    if (!textOutput) {
      return NextResponse.json({
        ok: true,
        source: 'mock',
        items: makeMockResults(track, user, style, count),
        error: 'AI 返回为空，已切换为演示内容',
      });
    }

    const items = JSON.parse(textOutput) as ResultItem[];

    return NextResponse.json({
      ok: true,
      source: 'ai',
      items,
    });
  } catch {
    return NextResponse.json({
      ok: true,
      source: 'mock',
      items: makeMockResults('家长会PPT', '小学老师', '实用干货', 10),
      error: '系统异常，已切换为演示内容',
    });
  }
}
