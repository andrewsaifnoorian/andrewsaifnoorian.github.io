import "./kaggle.css";
import AnimatedSection from "../animated-section/AnimatedSection";
import ScrambleText from "../scramble-text/ScrambleText";
import TiltCard from "../tilt-card/TiltCard";

interface KaggleCompetition {
  id: number;
  title: string;
  description: string;
  techniques: string[];
  score: string;
  scoreLabel: string;
  rank: string;
  tags: string[];
  colab: string;
  runtime?: string;
}

const competitions: KaggleCompetition[] = [
  {
    id: 1,
    title: "DNA Sequence Classification",
    description:
      "Binary classification of bacterial DNA sequences as virulent or benign using multi-source feature fusion.",
    techniques: [
      "k-mer features (k=3,4,5)",
      "Biological features (CpG, reading frames, homopolymers)",
      "TF-IDF char n-grams (4–7)",
      "LogReg + 5-seed DNN ensemble",
    ],
    score: "0.9873",
    scoreLabel: "AUC",
    rank: "Rank 1 (tied)",
    tags: ["Bioinformatics", "NLP"],
    colab: "",
    runtime: "T4 GPU",
  },
  {
    id: 2,
    title: "Bacteria Classification",
    description:
      "5-class bacterial species classification from 286-dimensional k-mer count frequency features.",
    techniques: [
      "StandardScaler + class-weight balancing",
      "DNN: Dense(128) → BN → Dropout(0.3) → Dense(64)",
      "Nadam optimizer",
      "EarlyStopping + ReduceLROnPlateau",
    ],
    score: "0.9621",
    scoreLabel: "F1",
    rank: "Rank 1",
    tags: ["Bioinformatics"],
    colab: "",
    runtime: "T4 GPU",
  },
  {
    id: 3,
    title: "Purchase Intent Classification",
    description:
      "Binary classification of online purchase intent from 17 behavioral e-commerce session features.",
    techniques: [
      "Wide & Deep DNN (512→256→128→64)",
      "93 engineered features (PgVal interactions, frequency encoding)",
      "SGDR cosine warm restarts",
      "Nadam optimizer",
    ],
    score: "0.9927",
    scoreLabel: "Accuracy",
    rank: "Rank 6 of 14",
    tags: ["Tabular", "Business"],
    colab: "",
    runtime: "T4 GPU",
  },
  {
    id: 4,
    title: "Audio Classification (Phonemes)",
    description:
      "5-class phoneme classification from 256-point log-periodogram spectral features across 50K utterances.",
    techniques: [
      "StandardScaler on full training set",
      "LightGBM (200 trees, num_leaves=63)",
      "Balanced class weights",
    ],
    score: "0.9284",
    scoreLabel: "Accuracy",
    rank: "Rank 8 of 10",
    tags: ["Audio", "Speech"],
    colab: "",
  },
  {
    id: 5,
    title: "Diamond Price Prediction",
    description:
      "Regression task predicting prices of 40K diamonds from 9 physical and quality characteristics.",
    techniques: [
      "RidgeCV with log-target transform",
      "Degree-2 polynomial feature expansion",
      "One-hot categorical encoding",
      "Quantile-matching post-processing",
    ],
    score: "603.56",
    scoreLabel: "MAE",
    rank: "",
    tags: ["Regression", "Tabular"],
    colab: "",
  },
  {
    id: 6,
    title: "Collaborative Filtering (Netflix)",
    description:
      "Movie rating prediction on a 128K-user × 380-movie sparse matrix using matrix factorization.",
    techniques: [
      "Truncated SVD (k=5 latent dimensions, 10 iterations)",
      "User-bias imputation",
      "Optimized rating threshold rounding",
    ],
    score: "0.4200",
    scoreLabel: "Accuracy",
    rank: "Rank 6 of 9",
    tags: ["Recommender Systems"],
    colab: "",
  },
  {
    id: 7,
    title: "Stellar Classification",
    description:
      "Multi-class classification of astronomical objects (stars, galaxies, quasars) from spectroscopic survey data.",
    techniques: [
      "Linear Discriminant Analysis (LDA)",
      "Custom redshift-split model",
    ],
    score: "—",
    scoreLabel: "",
    rank: "",
    tags: ["Astronomy", "Tabular"],
    colab: "",
  },
];

const KaggleCard = ({ competition }: { competition: KaggleCompetition }) => {
  const isRank1 = competition.rank.startsWith("Rank 1");

  return (
    <TiltCard>
      <article className={`kaggle_item${isRank1 ? " kaggle_item--highlight" : ""}`}>
        <div className="kaggle_item-header">
          {competition.score !== "—" ? (
            <div className="kaggle_item-score">
              <span className="kaggle_item-score-value">{competition.score}</span>
              {competition.scoreLabel && (
                <span className="kaggle_item-score-label">{competition.scoreLabel}</span>
              )}
            </div>
          ) : (
            <div className="kaggle_item-score">
              <span className="kaggle_item-score-value kaggle_item-score-value--placeholder">—</span>
            </div>
          )}
          {competition.rank && (
            <span className={`kaggle_item-rank${isRank1 ? " kaggle_item-rank--gold" : ""}`}>
              {competition.rank}
            </span>
          )}
        </div>

        <h3 className="kaggle_item-title">{competition.title}</h3>
        <p className="kaggle_item-desc">{competition.description}</p>

        <ul className="kaggle_item-techniques">
          {competition.techniques.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>

        <div className="kaggle_item-footer">
          <div className="kaggle_item-tags">
            {competition.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
            {competition.runtime && (
              <span className="kaggle_item-tags__runtime">{competition.runtime}</span>
            )}
          </div>
          {competition.colab && (
            <a
              href={competition.colab}
              className="btn"
              target="_blank"
              rel="noreferrer"
            >
              Notebook
            </a>
          )}
        </div>
      </article>
    </TiltCard>
  );
};

const Kaggle = () => (
  <section id="kaggle">
    <h5>Johns Hopkins University · ML Engineering</h5>
    <ScrambleText text="Kaggle Competitions" />
    <AnimatedSection>
      <div className="container kaggle_container">
        {competitions.map((comp) => (
          <KaggleCard key={comp.id} competition={comp} />
        ))}
      </div>
    </AnimatedSection>
  </section>
);

export default Kaggle;
