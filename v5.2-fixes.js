(()=>{
const V=window.__v5;
if(!V)return;

// Bug 1: finalMarket may be selected again when the ordinary event pool is exhausted.
// The second occurrence is converted into a genuine ten-year final decision with its own id,
// title, body, choices and settlement copy, so history/major-node summaries no longer duplicate it.
const oldPick=V.pick;
V.pick=(state,events,gate,rnd,echo)=>{
  const e=oldPick(state,events,gate,rnd,echo);
  if(!e||e.id!=='finalMarket'||!state.seen.includes('finalMarket')) return e;
  const opts=[
    {
      label:'A · 收住规模，把十年成果变成现金',
      detail:'这已经不是第八年的增长窗口。你选择停止追逐最后一轮流量，把库存、应收和短期项目逐项收口，优先让十年经营留下真正可以带走的净资产。',
      after:'你没有再参加一次相同的大促。团队用了几个星期清库存、催回款、结清临时合作。数字增长得慢了，但第一次有了“十年到这里可以交账”的感觉。周姐更认可这种收口，阿杰则觉得你放掉了一部分最后的增长空间。',
      effect:{cash:6800,inventory:-2200,business:-800,credit:3,risk:-5,stress:-4,flag:'final_close'}
    },
    {
      label:'B · 保留主业，做最后一次定向扩张',
      detail:'不复制第八年的全量大促，而是只挑十年里验证过的客户、渠道和品类追加资源。收益上限低于全面冲刺，但这次扩张建立在过去十年的真实经营数据上。',
      after:'你把最后的预算集中到最熟悉的一条业务线上，没有再追所有平台的热度。阿杰支持这个决定，苏岚要求把交付上限写死。最后几个月仍然忙碌，但它更像一次有边界的终局下注，而不是旧大促的重演。',
      effect:{cash:-4200,inventory:5200,business:4200,credit:2,skill:2,risk:3,stress:2,flag:'final_focus'}
    },
    {
      label:'C · 不再冲规模，重新分配十年后的生活与事业',
      detail:'你把最后一个决定留给“以后怎么经营”：降低高压业务占比、保留稳定现金流，并重新谈清团队权限与个人生活边界。它可能牺牲最后几个月的账面增长，却会改变十年之后还能不能继续。',
      after:'最后几个月没有出现戏剧性的销售峰值。你和苏岚重新谈权限，与许宁把风险资产和经营现金分开，也拒绝了两项需要继续透支生活的机会。十年结束时，你留下的不只是一个数字，还有下一阶段可以继续执行的边界。',
      effect:{cash:-1200,business:1600,credit:4,skill:2,risk:-4,stress:-7,flag:'final_rebalance'}
    }
  ];
  return {...e,id:'tenYearFinalDecision',title:'十年最后一笔决定',seed:`<p>第十年的日历已经接近最后几页。你曾经参加过市场大促，也经历过流量、库存、回款和关系的反复拉扯，所以这一次不再把“再冲一次销量”当成唯一答案。</p><p>账上每一笔钱都带着过去十年的来源：有的是冒险换来的，有的是忍住没有扩张留下的，也有的是别人愿意继续相信你才给出的账期。现在的问题不是还能不能再卖一轮，而是十年结束时，你究竟想留下什么。</p><p>周姐更关心你有没有把生活和现金留住；阿杰仍然看得到最后的增长机会；苏岚在意团队是否还要继续靠透支顶住；许宁则把经营资金、风险资产和未来一年需要的钱分成三张表。四个人第一次给出了明显不同的建议。</p><p>这不是第八年那次市场窗口的复制。第八年决定的是要不要抓增长，第十年决定的是如何为十年经营收尾，并把选择带进下一阶段。</p><p>你需要做出十年里的最后一个经营决定。</p>`,opts};
};

// Bug 2: character relations used to move in nearly the same narrow band.
// Keep the original event-specific relation update, then apply four distinct value systems.
const oldRelation=V.relation;
V.relation=(state,e,o)=>{
  const base=oldRelation(state,e,o)||0;
  const x=o.effect||{}, label=(o.label||'')+' '+(e.title||'');
  const growth=(x.inventory||0)>0||(x.business||0)>2500||(x.risk||0)>3||/扩张|冲|追加|大促|竞价/.test(label);
  const caution=(x.risk||0)<0||(x.stress||0)<0||/收住|止损|结清|控制|暂停|边界/.test(label);
  const teamwork=!!x.flag&&/network|team|final_rebalance/.test(x.flag)||/协商|团队|权限|共同|交接/.test(label);
  const discipline=(x.credit||0)>2||(x.debt||0)<0||/还款|现金|账期|结清|止损/.test(label);
  const shifts={zhou:0,ajie:0,sulan:0,xuning:0};
  if(caution){shifts.zhou+=3;shifts.xuning+=3;shifts.ajie-=2;}
  if(growth){shifts.ajie+=4;shifts.zhou-=2;shifts.xuning-=2;}
  if(teamwork){shifts.sulan+=5;shifts.ajie+=1;}
  if(discipline){shifts.xuning+=4;shifts.zhou+=1;}
  if((x.risk||0)>=6){shifts.xuning-=5;shifts.zhou-=3;shifts.ajie+=2;}
  if((x.stress||0)>=5){shifts.sulan-=4;shifts.zhou-=2;}
  if((x.credit||0)<0){shifts.zhou-=3;shifts.xuning-=3;}
  // Event-specific disagreements prevent all four people from marching together.
  const topic=V.topic(e);
  if(topic==='team'){shifts.sulan+=2;shifts.ajie-=1;}
  if(topic==='finance'){shifts.xuning+=2;shifts.ajie-=1;}
  if(topic==='supply'){shifts.ajie+=2;shifts.sulan-=1;}
  if(topic==='housing'||topic==='life'){shifts.zhou+=2;shifts.ajie-=1;}
  Object.keys(shifts).forEach(k=>{state.relations[k]=V.clamp((state.relations[k]??50)+shifts[k],0,100)});
  return base+Math.max(...Object.values(shifts).map(Math.abs));
};
})();