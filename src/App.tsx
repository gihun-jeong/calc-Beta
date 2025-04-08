// App.tsx
import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import './styles.css';

// // 얼굴 인상 이미지
// import faceMale1 from './assets/images/male/face-1.png';
// import faceMale2 from './assets/images/male/face-2.png';
// import faceMale3 from './assets/images/male/face-3.png';
// import faceMale4 from './assets/images/male/face-4.png';
// import faceMale5 from './assets/images/male/face-5.png';

// import faceFemale1 from './assets/images/female/face-1.png';
// import faceFemale2 from './assets/images/female/face-2.png';
// import faceFemale3 from './assets/images/female/face-3.png';
// import faceFemale4 from './assets/images/female/face-4.png';
// import faceFemale5 from './assets/images/female/face-5.png';

// import bobyMale1 from './assets/images/male/body-1.png';
// import bobyMale2 from './assets/images/male/body-2.png';
// import bobyMale3 from './assets/images/male/body-3.png';
// import bobyMale4 from './assets/images/male/body-4.png';
// import bobyMale5 from './assets/images/male/body-5.png';

// import bobyFemale1 from './assets/images/female/body-1.png';
// import bobyFemale2 from './assets/images/female/body-2.png';
// import bobyFemale3 from './assets/images/female/body-3.png';
// import bobyFemale4 from './assets/images/female/body-4.png';
// import bobyFemale5 from './assets/images/female/body-5.png';

const questions = [
  {
    title: '얼굴 인상',
    description: '첫인상이 호감형인지, 깔끔하고 단정한 인상인지',
    // maleImages: [faceMale1, faceMale2, faceMale3, faceMale4, faceMale5]
    // ,
    // femaleImages: [
    //   faceFemale1,
    //   faceFemale2,
    //   faceFemale3,
    //   faceFemale4,
    //   faceFemale5,
    // ],
  },
  {
    title: '키 / 체형',
    description: '키와 체형이 평균 이상이고 균형 잡혔는지',
    // maleImages: [bobyMale1, bobyMale2, bobyMale3, bobyMale4, bobyMale5]
    // ,
    // femaleImages: [
    //   bobyFemale1,
    //   bobyFemale2,
    //   bobyFemale3,
    //   bobyFemale4,
    //   bobyFemale5,
    // ],
  },
  {
    title: '패션 / 위생',
    description: '옷차림, 헤어스타일, 몸가짐 등 외적 관리 상태',
  },
  {
    title: '사진과 실물 일치도',
    description: '프로필과 실제 외모가 유사한지',
  },
  {
    title: '직업 안정성',
    description: '직업이 안정적이고 장기적인 성장 가능성이 있는지',
  },
  {
    title: '수입 수준',
    description: '월 수입, 연봉 등 경제적 자립 가능성',
  },
  {
    title: '자산 / 재정 상태',
    description: '집, 차량, 저축 등 자산 보유 또는 건전한 경제관념',
  },
  {
    title: '커리어 방향성',
    description: '본인의 진로에 대해 비전이나 계획이 있는지',
  },
  {
    title: '성격 (기본 성향)',
    description: '온화하고 긍정적이며 일반적인 인간관계에 무리가 없는지',
  },
  {
    title: '배려심 / 공감능력',
    description: '타인의 말에 공감하고 배려하는 태도가 있는지',
  },
  {
    title: '유머감각 / 대화력',
    description: '대화가 즐겁고 센스 있으며 적절한 유머를 구사하는지',
  },
  {
    title: '감정 조절력',
    description: '분노 조절, 감정 표현이 건강한 수준인지',
  },
  {
    title: '가족관계',
    description: '가족과의 관계가 원만하고 건강한지',
  },
  {
    title: '연애관 / 결혼관',
    description: '연애, 결혼에 대한 진지한 자세를 가지고 있는지',
  },
  {
    title: '취미 / 여가 활동',
    description: '너무 폐쇄적이거나 반대로 과한 외향적 성향은 아닌지',
  },
  {
    title: '음주 / 흡연 / 라이프스타일',
    description: '건강한 생활습관을 유지하고 있는지',
  },
  {
    title: '성장 배경',
    description: '학력, 가정환경, 인성과 관련된 성장 배경의 안정성',
  },
  {
    title: '종교 / 가치관',
    description: '상대와 충돌 가능성이 있는 종교, 정치관, 세계관 유무',
  },
  {
    title: '소개자의 신뢰도',
    description: '소개자의 추천 신뢰도 및 객관성',
  },
  {
    title: '매칭 가능성 / 직감',
    description: '이 사람은 소개팅이 잘 될 것 같다는 직관적 확신',
  },
];

export default function App() {
  const [evaluator, setEvaluator] = useState('');
  const [target, setTarget] = useState('');
  const [gender, setGender] = useState<'남성' | '여성'>('남성');
  const [started, setStarted] = useState(false);
  const [scores, setScores] = useState<number[]>(
    Array(questions.length).fill(3)
  );
  const [submitted, setSubmitted] = useState(false);
  const resultRef = useRef(null);

  const totalScore = scores.reduce((a, b) => a + b, 0);

  const getResultMessage = (score: number): string => {
    if (score >= 90) return '프리미엄 매물';
    if (score >= 80) return '무사고 실매물';
    if (score >= 70) return '연식은 있지만 실속형 매물';
    if (score >= 60) return '수리 또는 사고 의심 매물';
    if (score >= 50) return '사고 이력 매물';
    return '허위매물';
  };

  const shareResult = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: '소개팅 매물 계산기 결과',
        text: `${target}의 매물 점수는 ${totalScore}점!`,
        url,
      });
    } else {
      alert(
        '공유 기능을 지원하지 않는 브라우저입니다. URL을 복사해 공유해주세요.'
      );
    }
  };

  const downloadImage = async () => {
    if (resultRef.current) {
      const canvas = await html2canvas(resultRef.current);
      const link = document.createElement('a');
      link.download = target + '_' + 'INVOICE.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  if (!started) {
    return (
      <div className="app">
        <h3>소개받기 전에 매물점수 부터 보자!!</h3>
        <h1>📈매물 계산기📉</h1>
        <input
          type="text"
          placeholder="평가자 이름"
          value={evaluator}
          onChange={(e) => setEvaluator(e.target.value)}
        />
        <input
          type="text"
          placeholder="대상자 이름"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ marginRight: '1rem' }}>
            <input
              type="radio"
              value="남성"
              checked={gender === '남성'}
              onChange={() => setGender('남성')}
            />{' '}
            ♂️
          </label>
          <label>
            <input
              type="radio"
              value="여성"
              checked={gender === '여성'}
              onChange={() => setGender('여성')}
            />{' '}
            ♀️
          </label>
          <h5>평가 문항은 총 20문항 이며, 소요시간은 약 2분 소요됩니다</h5>
        </div>
        <button
          onClick={() => {
            if (evaluator && target) setStarted(true);
            else alert('평가자와 대상자 이름을 입력해주세요.');
          }}
        >
          설문 시작하기
        </button>
      </div>
    );
  }
  if (submitted) {
    return (
      <div className="result">
        <div ref={resultRef}>
          <h2>평가자 {evaluator}님이 판단한 결과</h2>
          <h1>
            {target}의 매물 점수는 {totalScore}점입니다!
          </h1>
          <h2>
            종합점수 {totalScore}점으로, 이 사람은 "
            {getResultMessage(totalScore)}" 입니다
          </h2>

          <div className="score-detail">
            {questions.map((q, idx) => (
              <div key={idx} style={{ marginTop: '1rem' }}>
                <strong>{q.title}</strong>: {scores[idx]}점<br />
                <small>{q.description}</small>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <button onClick={shareResult}>결과 공유하기</button>
          <button onClick={downloadImage}>이미지 저장</button>
        </div>
        <div style={{ marginTop: '2rem' }}>
          <iframe
            title="adfit"
            src="https://ads-partners.kakao.com/media-banner-script?slot=YOUR_SLOT_ID"
            style={{ width: '100%', height: '100px', border: 'none' }}
          ></iframe>
        </div>
        <button
          onClick={() => {
            setSubmitted(false);
            setStarted(false);
            setEvaluator('');
            setTarget('');
            setGender('남성');
            setScores(Array(questions.length).fill(3));
          }}
        >
          다시 평가하기
        </button>
      </div>
    );
  }

  return (
    <div className="app">
      <h2>대상자: {target} ({gender})</h2>
      {questions.map((q, idx) => (
        <div key={idx} className="slider-container">
          {/* {const images = gender === "남성" ? q.maleImages : q.femaleImages;
          images && (
            <img
              src={images[scores[idx] - 1]}
              alt={`${q.title} 예시`}
              className="question-image"
            />
          )} */}
          <label>{q.title}</label>
          <small>{q.description}</small>
          <input
            type="range"
            min="1"
            max="5"
            value={scores[idx]}
            onChange={(e) => {
              const newScores = [...scores];
              newScores[idx] = parseInt(e.target.value);
              setScores(newScores);
            }}
          />
          <div>{scores[idx]}점</div>
        </div>
      ))}
      <button onClick={() => setSubmitted(true)}>결과 보기</button>
    </div>
  );
}
