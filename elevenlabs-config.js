// ElevenLabs API 설정 파일
// 실제 사용 시 이 파일의 API 키를 본인의 ElevenLabs API 키로 교체하세요

const ELEVENLABS_CONFIG = {
  // ElevenLabs API 키 (https://elevenlabs.io에서 발급)
  API_KEY: 'sk_82e5a6661ba4fc783eebde024664b818b225785cd8950b49',
  
  // API 기본 URL
  BASE_URL: 'https://api.elevenlabs.io/v1',
  
  // 대화 ID (실제 ElevenLabs에서 생성한 대화의 ID로 교체)
  CONVERSATION_ID: 'conv_8801k49sbp7feyasqepmahd608xv',
  
  // 에이전트 ID (ElevenLabs ConvAI 에이전트)
  AGENT_ID: 'agent_1901k42pgdadfzhbp6w88r22tpq3',
  
  // CORS 프록시 설정 (필요시 활성화)
  USE_PROXY: false,
  PROXY_URL: 'http://localhost:3001/api/elevenlabs',
  
  // 음성 설정
  VOICE_SETTINGS: {
    stability: 0.5,
    similarity_boost: 0.8,
    style: 0.0,
    use_speaker_boost: true
  },
  
  // 지원되는 오디오 형식
  SUPPORTED_FORMATS: ['mp3', 'wav', 'mpeg'],
  
  // 기본 언어 설정 (한국어)
  DEFAULT_LANGUAGE: 'ko',
  
  // 에러 메시지
  ERROR_MESSAGES: {
    API_KEY_MISSING: 'ElevenLabs API 키가 설정되지 않았습니다.',
    CONVERSATION_NOT_FOUND: '대화를 찾을 수 없습니다.',
    AUDIO_LOAD_FAILED: '오디오를 불러오는데 실패했습니다.',
    TRANSCRIPT_LOAD_FAILED: '트랜스크립트를 불러오는데 실패했습니다.',
    NETWORK_ERROR: '네트워크 오류가 발생했습니다.'
  }
};

// 설정 유효성 검사
function validateConfig() {
  const errors = [];
  
  if (ELEVENLABS_CONFIG.API_KEY === 'YOUR_ELEVENLABS_API_KEY') {
    errors.push('API 키를 설정해주세요.');
  }
  
  if (ELEVENLABS_CONFIG.CONVERSATION_ID === 'YOUR_CONVERSATION_ID') {
    errors.push('대화 ID를 설정해주세요.');
  }
  
  return errors;
}

// 설정 내보내기
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ELEVENLABS_CONFIG, validateConfig };
} else {
  window.ELEVENLABS_CONFIG = ELEVENLABS_CONFIG;
  window.validateConfig = validateConfig;
}
