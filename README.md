# FACT: A Simple and Efficient Framework for Active Finetuning

> **IEEE Transactions on Image Processing (TIP), 2026**
>
> [Wenshuai Xu](https://vincentxu521.github.io), You Song, Yuzhuo Cui, Minjie Ren, Qingjie Liu, Zhenghui Hu
>
> Beihang University (BUAA)

This is the project page for our paper **"FACT: A Simple and Efficient Framework for Active Finetuning"**, accepted by IEEE Transactions on Image Processing (TIP).

## Overview

Active finetuning aims to improve a pretrained model's performance on a target task by finetuning it with carefully selected informative or challenging data. However, existing methods typically apply standard finetuning strategies (e.g., Full Finetuning, Linear Probing) without considering the unique challenges of the active learning setting — namely, distribution shift and limited labeled data.

We formally define the **FiAF** (*Finetuning in Active Finetuning*) task and propose **FACT** (*Finetuning in ACTive finetuning*), a three-phase hierarchical framework that addresses these challenges through:

1. **Linear Probing (LP)** — Warm-start the model via frozen-feature classification
2. **Full Finetuning (FF)** — Unlock all parameters to capture task-specific representations
3. **Lightweight Model (LM)** — Train a compact head with frozen-feature augmentation (FroFA) to mitigate overfitting

## Key Contributions

- **FiAF Task**: Formal recognition that finetuning in active finetuning fundamentally differs from traditional finetuning due to distribution shift and limited labeled data
- **FACT Framework**: A three-phase hierarchical approach (LP -> FF -> LM) with frozen feature augmentation, achieving state-of-the-art performance
- **Backbone Evaluation**: Comprehensive comparison across ConvNeXt, ViT-S, ViT-B, and Vision LSTM architectures
- **Extensive Experiments**: Evaluation on classic (CIFAR10/100, ImageNet-1k), long-tail (CIFAR10-LT/100-LT), and fine-grained (StanfordCars, FGVCAircraft) benchmarks

## Project Page

Visit the live project page: [https://vincentxu521.github.io/TIP_FACT_Project_Page/](https://vincentxu521.github.io/TIP_FACT_Project_Page/)

The project page includes:
- Paper overview and abstract
- FiAF task motivation and illustration
- FACT framework description with architecture diagram
- Experimental results carousel (Figure 3, Tables 1-6)
- Author information
- BibTeX citation with one-click copy

## Paper

- **arXiv**: [2606.02079](https://arxiv.org/abs/2606.02079)

## BibTeX

```bibtex
@misc{xu2026fact_TIP,
  title   = {FACT: A Simple and Efficient Framework for Active Finetuning},
  author  = {Wenshuai Xu and You Song and Yuzhuo Cui and Minjie Ren and Qingjie Liu and Zhenghui Hu},
  year    = {2026},
  eprint  = {2606.02079},
  archivePrefix = {arXiv},
  primaryClass  = {cs.CV},
  url     = {https://arxiv.org/abs/2606.02079},
}
```

## License

This project page is built using the [Academic Project Page Template](https://github.com/eliahuhorwitz/Academic-project-page-template). The template is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/).
