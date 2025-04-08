// ================================
// 📦 Importações de dependências
// ================================
import {
  Component,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
  ElementRef,
  Renderer2
} from '@angular/core'; // Importações essenciais do Angular
import { MenuItem } from 'primeng/api'; // Tipagem para itens do menu
import { CommonModule } from '@angular/common'; // Módulo base do Angular
import { MenubarModule } from 'primeng/menubar'; // Módulo de menu do PrimeNG
import { BadgeModule } from 'primeng/badge'; // Módulo de badges do PrimeNG

// ===================================
// 🧩 Declaração do Componente Navbar
// ===================================
@Component({
  selector: 'app-navbar', // Seletor usado no HTML
  templateUrl: './navbar.component.html', // Caminho do arquivo HTML
  styleUrls: ['./navbar.component.scss'], // Caminho do arquivo de estilos
  standalone: true, // Componente autônomo (Angular moderno)
  encapsulation: ViewEncapsulation.None, // Permite aplicar estilos globais
  imports: [CommonModule, MenubarModule, BadgeModule] // Módulos importados localmente
})
export class NavbarComponent implements OnInit, OnDestroy {
  // ====================================
  // 🌐 Dados de exibição e configuração
  // ====================================
  items: MenuItem[] = []; // Lista de itens que serão exibidos no Menubar
  isDarkTheme: boolean = false; // Estado do tema (claro/escuro)
  logoUrl: string = ''; // Caminho dinâmico do logotipo conforme o tema

  // ========================================
  // 👤 Controle do menu suspenso do avatar
  // ========================================
  showProfileMenu: boolean = false; // Exibe ou oculta o menu suspenso do avatar

  // =============================================
  // 🧹 Listener global para detectar clique fora
  // =============================================
  private globalClickListener!: () => void; // Função usada para remover o listener no destroy

  // =========================================
  // 🔧 Construtor com acesso ao DOM e estilo
  // =========================================
  constructor(
    private el: ElementRef, // Permite acessar elementos do DOM
    private renderer: Renderer2 // Permite manipular DOM de forma segura
  ) {}

  // ===============================
  // 🚀 Inicialização do componente
  // ===============================
  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme'); // Recupera o tema salvo
    this.isDarkTheme = savedTheme === 'dark'; // Define o tema atual

    this.applyTheme(); // Aplica a classe de tema ao body
    this.loadMenuItems(); // Carrega os itens de menu conforme o estado

    // ======================================================
    // 🖱️ Adiciona listener global para cliques fora do menu
    // ======================================================
    this.globalClickListener = this.renderer.listen('document', 'click', (event: Event) => {
      const clickedInside = this.el.nativeElement.contains(event.target); // Verifica se o clique foi dentro do componente
      if (!clickedInside) {
        this.showProfileMenu = false; // Fecha o menu se o clique for fora
      }
    });
  }

  // =====================================
  // 🧹 Limpa recursos ao destruir o componente
  // =====================================
  ngOnDestroy(): void {
    if (this.globalClickListener) {
      this.globalClickListener(); // Remove o listener para evitar vazamentos de memória
    }
  }

  // ===================================
  // 🔁 Alterna entre temas dinâmicos
  // ===================================
  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme; // Inverte o estado atual do tema
    const themeValue = this.isDarkTheme ? 'dark' : 'light'; // Define o valor textual do tema
    localStorage.setItem('theme', themeValue); // Salva o tema no localStorage
    this.applyTheme(); // Aplica a nova classe ao body
    this.loadMenuItems(); // Atualiza o menu para refletir o tema
    this.updateLogoUrl(); // Atualiza o logo
  }

  // ====================================================
  // 🖼️ Atualiza o caminho do logo de acordo com o tema
  // ====================================================
  updateLogoUrl(): void {
    this.logoUrl = this.isDarkTheme 
      ? 'src/assets/imagens/DynamisBank_Logo_Transparent_BlackText.svg' 
      : 'src/assets/imagens/DynamisBank_Logo_Transparent_WhiteText.svg';
  }

  // =============================================
  // 🎨 Aplica a classe de tema no elemento <body>
  // =============================================
  applyTheme(): void {
    const body = document.body;
    body.classList.remove('dark-theme', 'light-theme'); // Remove classes anteriores
    body.classList.add(this.isDarkTheme ? 'dark-theme' : 'light-theme'); // Adiciona a nova classe
  }

  // =====================================
  // 📋 Define os itens do menu principal
  // =====================================
  loadMenuItems(): void {
    this.items = [
      {
        label: 'Minha Conta',
        icon: 'pi pi-user',
        items: [
          { label: 'Perfil', icon: 'pi pi-fw pi-pencil' },
          { label: 'Configurações', icon: 'pi pi-fw pi-cog' }
        ]
      },
      {
        label: 'Produtos',
        icon: 'pi pi-box',
        items: [
          { label: 'Ações', icon: 'pi pi-fw pi-chart-line' },
          { label: 'Renda Fixa', icon: 'pi pi-fw pi-money-bill' }
        ]
      },
      {
        label: 'Atendimento',
        icon: 'pi pi-comments',
        items: [
          { label: 'Suporte', icon: 'pi pi-fw pi-question' },
          { label: 'Chat', icon: 'pi pi-fw pi-comments' }
        ]
      },
      {
        label: 'Área do Trader',
        icon: 'pi pi-briefcase',
        items: [
          { label: 'Home Broker', icon: 'pi pi-fw pi-home' }
        ]
      },
      {
        label: 'Notificações',
        icon: 'pi pi-bell' // Item simples com ícone
      },
      {
        label: '', // Alternância do ícone de tema
        icon: this.isDarkTheme ? 'pi pi-eye' : 'pi pi-eye-slash',
        command: () => this.toggleTheme() // Executa troca de tema ao clicar
      },
      {
        label: 'Daniel Möllmann', // Nome do usuário
        icon: 'pi pi-user' // Ícone do perfil
      }
    ];
  }

  // =============================================
  // 👆 Alterna exibição do menu suspenso de perfil
  // =============================================
  toggleProfileMenu(): void {
    this.showProfileMenu = !this.showProfileMenu; // Inverte o estado atual da visibilidade
  }

  // =============================================
  // 📌 Ações do submenu suspenso (avatar)
  // =============================================
  onOptionClick(option: string): void {
    this.showProfileMenu = false; // Fecha o menu após o clique

    switch (option) {
      case 'dados':
        console.log('🔍 Navegar para Dados Cadastrais');
        // Implementar navegação com Router ou lógica
        break;

      case 'perfil':
        console.log('📊 Acessar Perfil de Investimentos');
        // Redirecionar ou abrir modal de perfil
        break;

      case 'sair':
        console.log('🚪 Logout do sistema');
        // Limpar sessão, tokens ou redirecionar para login
        break;
    }
  }
}
