// ================================
// 📦 Importações de dependências
// ================================
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ElementRef,
  Renderer2
} from '@angular/core'; // Importações Angular
import { MenuItem } from 'primeng/api'; // Tipo do menu
import { CommonModule } from '@angular/common'; // Base Angular
import { MenubarModule } from 'primeng/menubar'; // Menu do PrimeNG
import { BadgeModule } from 'primeng/badge'; // Badge de notificação

// ===================================
// 🧩 Declaração do Componente Navbar
// ===================================
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None, // Permite aplicar CSS global
  imports: [CommonModule, MenubarModule, BadgeModule]
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] = []; // Lista de itens do menu
  isDarkTheme: boolean = false; // Tema claro/escuro
  logoUrl: string = ''; // URL do logo


  // =========================================
  // 🔧 Construtor com acesso ao DOM e estilo
  // =========================================
  constructor(
    private el: ElementRef, // Acesso ao template DOM
    private renderer: Renderer2 // Utilitário para editar DOM com segurança
  ) {}

  // ===============================
  // 🚀 Inicialização do componente
  // ===============================
  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    this.isDarkTheme = savedTheme === 'dark';

    this.applyTheme();
    this.loadMenuItems();
  }

  // ===================================
  // 🔁 Alterna entre temas dinâmicos
  // ===================================
  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    const themeValue = this.isDarkTheme ? 'dark' : 'light';
    localStorage.setItem('theme', themeValue);
    this.applyTheme();
    this.loadMenuItems();
    this.updateLogoUrl();
  }

  updateLogoUrl(): void {
    this.logoUrl = this.isDarkTheme 
      ? 'src/assets/imagens/DynamisBank_Logo_Transparent_BlackText.svg' 
      : 'src/assets/imagens/DynamisBank_Logo_Transparent_WhiteText.svg';
  }

  // =============================================
  // 🎨 Aplica o tema dinamicamente ao <body>
  // =============================================
  applyTheme(): void {
    const body = document.body;
    body.classList.remove('dark-theme', 'light-theme');
    body.classList.add(this.isDarkTheme ? 'dark-theme' : 'light-theme');
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
        icon: 'pi pi-bell'
      },
      {
        label: '',
        icon: this.isDarkTheme ? 'pi pi-eye' : 'pi pi-eye-slash',
        command: () => this.toggleTheme()
      },
      {
        label: 'Arthur Gomes',
        icon: 'pi pi-user'
      },
    ];
  }
}