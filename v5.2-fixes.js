(()=>{
const V=window.__v5;
if(!V)return;

const oldPick=V.pick;
V.pick=(state,events,gate,rnd,echo)=>{
  let e=oldPick(state,events,gate,rnd,echo);
  if(!e||e.id!=='finalMarket') return e;

  if(state.year<10){
    if(state.seen.includes('lateGrowthWindow')){
      const pool=events.filter(x=>x.id!=='finalMarket'&&!state.seen.includes(x.id)&&gate(x)&&x.when(state));
      if(pool.length) return pool[Math.floor(rnd()*pool.length)];
      return {
        id:'lateBusinessReview',
        title:'旺季前的经营复盘',
        seed:`<p>第 ${state.year} 年的经营已经进入后半程。平台和市场都在预热下一轮旺季，但你没有再把“参加一次大促”当成唯一增长方式。</p><p>过去几年留下的客户、库存、员工安排和现金压力开始同时影响判断。有人建议补货，有人建议修流程，也有人认为现在更应该把资源留给已经验证过的业务。</p><p>这次没有“最后一搏”的意味。它只是十年经营中一次普通但重要的复盘：你要决定下一阶段靠效率、客户还是产品继续往前走。</p>`,
        opts:[
          {label:'A · 压缩低效业务',detail:'停掉回报低、售后重的部分，把人力和现金留给已经验证过的业务。',after:'你砍掉了两项看起来热闹、实际不断消耗时间的工作。收入没有立刻暴涨，但团队第一次感觉每天做的事情更集中。',effect:{cash:900,business:-400,credit:2,risk:-2,stress:-3,flag:'late_review_efficiency'}},
          {label:'B · 回访老客户',detail:'不追新流量，集中联系过去几年真正复购过的人。',after:'你没有买新的流量，而是把时间花在老客户和旧合作方身上。订单增长不猛，却让几段快要断掉的关系重新活了起来。',effect:{cash:-500,business:1500,credit:4,skill:1,flag:'late_review_clients'}},
          {label:'C · 试一个新细分品类',detail:'用小预算验证一个新方向，限制库存和试错规模。',after:'你只做了一个小批量测试。它没有改变全局，却给第九、十年的经营留下了一个新的可能性。',effect:{cash:-1200,inventory:1500,skill:2,risk:2,flag:'late_review_product'}}
        ]
      };
    }

    return {
      id:'lateGrowthWindow',
      title:'年末增长窗口',
      seed:`<p>第 ${state.year} 年接近年末，平台和线下渠道同时进入旺季。你已经不是刚到临川时那个只能靠一次机会翻身的人，现在真正的问题是：怎样利用一段明显的市场热度，而不把之后两年的经营空间提前透支。</p><p>阿杰认为旺季就是要敢进货，错过就不会等你；苏岚更关心页面、客服和交付能不能接住突然增加的订单；许宁则提醒，年末销售额再漂亮，也不能掩盖库存和回款周期。周姐只问了一句：忙完这一轮，你还剩多少余地过日子。</p><p>这不是十年的最后一搏，也不是“最后一次市场窗口”。它只是中后期一次重要增长机会。你可以扩大经过验证的业务、控制规模做老客户活动，或者干脆不追热点，把资源用于下一阶段。</p><p>你准备怎样利用这次年末增长窗口？</p>`,
      opts:[
        {label:'A · 只放大已经验证过的爆款',detail:'集中补最熟悉的品类，不同时扩新品和新渠道。增长更集中，但库存与交付仍会明显承压。',after:'你没有把所有热度都接进来，只把预算压在过去两年最稳定的一条线上。销量明显上升，阿杰觉得你终于敢放大优势，苏岚则一直盯着发货上限，避免爆单把售后拖垮。',effect:{cash:-4200,inventory:5200,business:2600,credit:2,risk:3,stress:3,flag:'late_growth_focus'}},
        {label:'B · 做老客户限定活动',detail:'不争平台最大流量，优先让过去成交过的人复购。增长上限较低，但回款、售后和需求更可控。',after:'活动没有冲上排行榜，却带回一批很久没联系的客户。订单量没有失控，团队还能把每个问题处理完。许宁认为这轮增长质量比数字更重要。',effect:{cash:-1800,business:2300,credit:5,risk:-1,stress:-1,flag:'late_growth_clients'}},
        {label:'C · 放弃旺季扩张，修下一阶段基础',detail:'不追这轮增长，把现金和时间用于库存、流程、合同和团队分工。短期会错过销售高峰。',after:'群里不断有人晒大促成绩，你却把仓库和账重新理了一遍。这个季度的销售没有明显上升，但几项过去靠人记着的工作终于变成了稳定流程。',effect:{cash:-900,skill:3,credit:2,risk:-3,stress:-4,flag:'late_growth_systems'}}
      ]
    };
  }

  return {
    ...e,
    id:'finalMarket',
    title:'最后一次市场窗口',
    seed:`<p>第十年的日历已经接近最后几页。平台给出最后一轮大促入口，线下渠道也在争年底库存。和第八年的年末增长窗口不同，这一次你已经没有足够时间把一次错误留给“明年慢慢修”。</p><p>过去十年的客户、库存、团队、关系和债务都集中到同一张表上。阿杰仍然看见最后的增长机会；苏岚先算团队承载量；许宁把现金、应收和风险资产分开；周姐只关心你会不会为了一个终点数字再次透支生活。</p><p>参加大促可以冲刺最后增长，但会同时放大库存、履约和现金压力；收住规模能把成果变得更真实；重新分配业务，则意味着你把十年的最后一个决定留给“以后还要怎样继续”。</p><p>这是十年里真正的最后一次市场窗口。你准备怎样收尾？</p>`,
    opts:[
      {label:'A · 参加最后一次大促，冲刺终点',detail:'只开放经过验证的商品，并设定库存、客服和发货上限。你仍然选择增长，但这次不允许无限加码。',after:'最后一轮订单迅速涌入。团队没有追求所有流量，而是在达到预设上限后主动关掉部分入口。你抓住了最后增长，也第一次知道什么时候必须停手。',effect:{cash:-5200,inventory:6500,business:4800,credit:2,risk:5,stress:4,flag:'final_sprint'}},
      {label:'B · 收住规模，把成果变成现金',detail:'停止追逐新增流量，把库存、应收和临时项目逐项收口，让十年结局建立在真正能兑现的资产上。',after:'你没有再冲销量。团队花最后几个月清库存、催回款、结清临时合作。数字增长慢了，但账第一次真正有了“可以交卷”的感觉。',effect:{cash:7200,inventory:-2400,business:-700,credit:4,risk:-5,stress:-5,flag:'final_close'}},
      {label:'C · 重排十年后的业务与生活',detail:'降低高压业务占比，保留稳定现金流，并重新谈清团队权限、投资边界和个人生活安排。',after:'最后几个月没有出现夸张的销售峰值。你和苏岚重新谈权限，与许宁把经营现金和风险资产彻底分开，也拒绝了两项继续透支生活的机会。十年结束时，你留下的不只是净资产，还有下一阶段可以继续执行的边界。',effect:{cash:-1000,business:1800,credit:4,skill:2,risk:-4,stress:-7,flag:'final_rebalance'}}
    ]
  };
};

const oldRelation=V.relation;
V.relation=(state,e,o)=>{
  const base=oldRelation(state,e,o)||0;
  const x=o.effect||{}, text=((o.label||'')+' '+(e.title||'')+' '+(o.detail||''));
  const growth=(x.inventory||0)>0||(x.business||0)>2200||(x.risk||0)>3||/扩张|冲刺|大促|竞价|追加|补货/.test(text);
  const caution=(x.risk||0)<0||(x.stress||0)<0||/收住|止损|控制|暂停|边界|限量/.test(text);
  const teamwork=/协商|团队|权限|共同|交接|分工|老客户/.test(text)||/team|network|rebalance/.test(x.flag||'');
  const discipline=(x.credit||0)>=3||(x.debt||0)<0||/现金|账期|回款|结清|合同|流程/.test(text);
  const shifts={zhou:0,ajie:0,sulan:0,xuning:0};

  if(caution){shifts.zhou+=4;shifts.xuning+=4;shifts.ajie-=3;}
  if(growth){shifts.ajie+=5;shifts.sulan+=1;shifts.zhou-=3;shifts.xuning-=3;}
  if(teamwork){shifts.sulan+=5;shifts.zhou+=1;shifts.ajie-=1;}
  if(discipline){shifts.xuning+=5;shifts.zhou+=2;shifts.ajie-=1;}
  if((x.risk||0)>=6){shifts.ajie+=3;shifts.xuning-=6;shifts.zhou-=4;}
  if((x.stress||0)>=5){shifts.sulan-=5;shifts.zhou-=3;}
  if((x.credit||0)<0){shifts.zhou-=4;shifts.xuning-=4;shifts.sulan-=2;}

  const topic=V.topic(e);
  if(topic==='team'){shifts.sulan+=4;shifts.ajie-=2;}
  if(topic==='finance'){shifts.xuning+=4;shifts.ajie-=2;}
  if(topic==='supply'){shifts.ajie+=4;shifts.sulan-=2;}
  if(topic==='housing'||topic==='life'){shifts.zhou+=4;shifts.ajie-=2;}
  if(topic==='customer'){shifts.sulan+=2;shifts.xuning+=1;}

  const first=(o.label||'').trim()[0];
  if(first==='A'){shifts.zhou+=1;shifts.xuning+=2;shifts.ajie-=1;}
  if(first==='B'){shifts.ajie+=2;shifts.sulan+=1;shifts.zhou-=1;shifts.xuning-=1;}
  if(first==='C'){shifts.sulan+=2;shifts.zhou+=1;shifts.ajie-=1;}

  Object.keys(shifts).forEach(k=>{state.relations[k]=V.clamp((state.relations[k]??50)+shifts[k],0,100)});
  return base+Math.max(...Object.values(shifts).map(Math.abs));
};
})();